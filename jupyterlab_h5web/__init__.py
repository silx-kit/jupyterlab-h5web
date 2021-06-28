from .widget import H5Web


def _jupyter_server_extension_points():
    return [{"module": "jupyterlab_h5web"}]


def _load_jupyter_server_extension(server_app):
    """Registers the API handler to receive HTTP requests from the frontend extension."""
    from .handlers import setup_handlers

    # root_dir for jupyter lab 3.x / notebook_dir for jupyter lab 2.x
    base_dir = (
        server_app.root_dir
        if hasattr(server_app, "root_dir")
        else server_app.notebook_dir
    )
    setup_handlers(server_app.web_app, base_dir)
    server_app.log.info(
        f"Jupyterlab-h5web extension will serve HDF5 files from {base_dir}"
    )


# For backward compatibility with notebook server - useful for Binder/JupyterHub
load_jupyter_server_extension = _load_jupyter_server_extension
