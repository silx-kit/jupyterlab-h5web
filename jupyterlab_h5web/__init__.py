import jupyterlab_hdf

def _jupyter_server_extension_paths():
    return [{"module": "jupyterlab_h5web"}]

def load_jupyter_server_extension(nb_server_app):
    jupyterlab_hdf.load_jupyter_server_extension(nb_server_app)
