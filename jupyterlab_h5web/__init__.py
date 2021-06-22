from .widget import H5Web


def _jupyter_server_extension_points():
    return [{"module": "jupyterlab_h5web"}]


def _load_jupyter_server_extension(server_app):
    """Registers the API handler to receive HTTP requests from the frontend extension."""
    from .handlers import setup_handlers

    setup_handlers(server_app.web_app, server_app.notebook_dir)
    server_app.log.info(
        f"Jupyterlab-h5web extension will serve HDF5 files from {server_app.notebook_dir}"
    )


# For backward compatibility with notebook server - useful for Binder/JupyterHub
load_jupyter_server_extension = _load_jupyter_server_extension
