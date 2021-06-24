from pathlib import Path
from typing import Dict, Tuple, Union
from IPython.core.display import DisplayObject
from .utils import as_absolute_path


class H5Web(DisplayObject):
    mimetype = "application/x-hdf5"

    def __init__(self, file_path: Union[str, Path], **kwargs) -> None:
        # "Data" here is the path to the HDF5 file.
        self.data = as_absolute_path(Path.cwd(), Path(file_path))
        self.metadata = {}
        if kwargs:
            self.metadata.update(kwargs)
        self._check_data()

    def _check_data(self) -> None:
        if not self.data.is_file():
            raise FileNotFoundError(f"{self.data} is not a valid file.")

    def _repr_mimebundle_(
        self, include=None, exclude=None
    ) -> Tuple[Dict[str, str], dict]:
        return {self.mimetype: str(self.data)}, self.metadata
