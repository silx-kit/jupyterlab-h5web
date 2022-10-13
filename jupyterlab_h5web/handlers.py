from tornado.web import authenticated, MissingArgumentError
from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
from pathlib import Path

from h5grove.encoders import encode
from h5grove.content import (
    get_content_from_file,
    EntityContent,
    ResolvedEntityContent,
    DatasetContent,
)

from .utils import as_absolute_path, create_error


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

        with get_content_from_file(
            as_absolute_path(self.base_dir, Path(file_path)),
            path,
            create_error,
            h5py_options={"locking": False},
        ) as content:
            payload = self.parse_content(content)

        response = encode(payload, format_arg)

        for key, value in response.headers.items():
            self.set_header(key, value)

        self.finish(response.content)

    def parse_content(self, content: EntityContent):
        raise NotImplementedError

    def finish(self, *args, **kwargs):
        # Override APIHandler.finish to remove the JSON Content-Type header as h5grove can return application/octet-stream
        self.update_api_activity()
        return super(APIHandler, self).finish(*args, **kwargs)


class AttributeHandler(BaseHandler):
    def parse_content(self, content):
        assert isinstance(content, ResolvedEntityContent)
        return content.attributes()


class DataHandler(BaseHandler):
    def parse_content(self, content):
        selection = self.get_query_argument("selection", None)

        assert isinstance(content, DatasetContent)
        return content.data(selection)


class MetadataHandler(BaseHandler):
    def parse_content(self, content):
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
