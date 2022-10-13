from pathlib import Path
from tornado.web import HTTPError


def as_absolute_path(base_dir: Path, file_path: Path) -> Path:
    if file_path.is_absolute():
        return file_path

    return base_dir / file_path


def create_error(status_code: int, message: str):
    return HTTPError(status_code, message)
