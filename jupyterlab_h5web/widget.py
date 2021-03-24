import os.path
from pathlib import Path
from typing import Dict, Tuple, Union
from IPython.core.display import DisplayObject


class H5web(DisplayObject):
    mimetype = "application/x-hdf5"

    def __init__(self, data: Union[str, Path], **kwargs) -> None:
        # "Data" here is the path to the HDF5 file.
        self.data = data
        self.metadata = {}
        if kwargs:
            self.metadata.update(kwargs)

    def _check_data(self) -> None:
        if not os.path.isfile(self.data):
            raise FileNotFoundError(f"{self.data} is not a valid file.")

    def _repr_mimebundle_(
        self, include=None, exclude=None
    ) -> Tuple[Dict[str, str], dict]:
        return {self.mimetype: str(self.data)}, self.metadata
