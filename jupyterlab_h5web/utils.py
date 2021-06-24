from pathlib import Path


def as_absolute_path(base_dir: Path, file_path: Path) -> Path:
    if file_path.is_absolute():
        return file_path

    return base_dir / file_path
