import h5py
from tornado.web import authenticated, MissingArgumentError
from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
from pathlib import Path

from h5grove.encoders import encode
from h5grove.content import create_content, ResolvedEntityContent, DatasetContent

from .utils import as_absolute_path


class BaseHandler(APIHandler):
    def initialize(self, base_dir: Path) -> None:
        self.base_dir = base_dir

    @authenticated
    def get(self):
        file_path = self.get_query_argument("file", None)
        if file_path is None:
            raise MissingArgumentError("File argument is required")
        path = self.get_query_argument("path", None)
        format_arg = self.get_query_argument("format", None)

        with h5py.File(as_absolute_path(self.base_dir, Path(file_path)), "r") as h5file:
            content = self.get_content(h5file, path)

        response = encode(content, format_arg)

        for key, value in response.headers.items():
            self.set_header(key, value)

        self.finish(response.content)

    def get_content(self, h5file, path):
        raise NotImplementedError

    def finish(self, *args, **kwargs):
        # Override APIHandler.finish to remove the JSON Content-Type header as h5grove can return application/octet-stream
        self.update_api_activity()
        return super(APIHandler, self).finish(*args, **kwargs)


class AttributeHandler(BaseHandler):
    def get_content(self, h5file, path):
        content = create_content(h5file, path)
        assert isinstance(content, ResolvedEntityContent)
        return content.attributes()


class DataHandler(BaseHandler):
    def get_content(self, h5file, path):
        selection = self.get_query_argument("selection", None)

        content = create_content(h5file, path)
        assert isinstance(content, DatasetContent)
        return content.data(selection)


class MetadataHandler(BaseHandler):
    def get_content(self, h5file, path):
        content = create_content(h5file, path)
        return content.metadata()


def setup_handlers(web_app, base_dir: str):
    pattern = ".*$"
    endpoints = {"attr": AttributeHandler, "data": DataHandler, "meta": MetadataHandler}

    handlers = [
        (
            url_path_join(web_app.settings["base_url"], "h5web", endpoint, pattern),
            handler,
            {"base_dir": Path(base_dir)},
        )
        for endpoint, handler in endpoints.items()
    ]

    web_app.add_handlers(pattern, handlers)
