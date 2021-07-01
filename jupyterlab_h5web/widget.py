from pathlib import Path
from typing import Dict, Tuple, Union
from urllib.parse import quote_plus
from IPython.core.display import DisplayObject
from .utils import as_absolute_path


class H5Web(DisplayObject):
    mimetype = "application/x-hdf5"

    def __init__(self, file_path: Union[str, Path], **kwargs) -> None:
        # "Data" here is the path to the HDF5 file.
        absolute_file_path = as_absolute_path(Path.cwd(), Path(file_path))
        if not absolute_file_path.is_file():
            raise FileNotFoundError(f"{absolute_file_path} is not a valid file.")
        self.data = quote_plus(str(absolute_file_path), safe="/")
        self.metadata = {}
        if kwargs:
            self.metadata.update(kwargs)

    def _repr_mimebundle_(
        self, include=None, exclude=None
    ) -> Tuple[Dict[str, str], dict]:
        return {self.mimetype: str(self.data)}, self.metadata
