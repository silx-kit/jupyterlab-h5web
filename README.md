# jupyterlab-h5web

![Github Actions Status](https://github.com/silx-kit/jupyterlab-h5web/workflows/Build/badge.svg)
[![PyPI version](https://badge.fury.io/py/jupyterlab-h5web.svg)](https://badge.fury.io/py/jupyterlab-h5web)

A JupyterLab extension to explore and visualize HDF5 file contents. Based on [h5web](https://github.com/silx-kit/h5web).

**WARNING: This extension is still in active development. Please report any encountered issue.**

![Extension screenshot](https://user-images.githubusercontent.com/42204205/106109102-6c280100-6149-11eb-96eb-38a14983702f.png)

## Requirements

- JupyterLab 2 or JupyterLab 3

## Install

_Note: You will need NodeJS to install the extension._

```bash
pip install jupyterlab_h5web
jupyter lab build
```

To enable support for additional filters such as [blosc](https://github.com/Blosc/hdf5-blosc) or [bitshuffle](https://github.com/kiyo-masui/bitshuffle):

```bash
pip install jupyterlab_h5web[full]
jupyter lab build
```

This will install [hdf5plugin](https://pypi.org/project/hdf5plugin/) in addition to the extension.

## Usage

Once the extension is installed, you can double-click on an HDF5 file or right-click _Open with_ -> _h5web_ to launch a tab.

This tab is composed of a sidebar, where you can explore the structure of the HDF5 file, and of a main area where the visualization of the selected entity takes place. This visualization is controlled by the upper-right button that can toggle between:

- _Display_: visualize datasets using `Line`, `Heatmap` or `Matrix` visualizations.
- _Inspect_: show the metadata and attributes of any entity

### Supported file formats

**jupyter-h5web** detects HDF5 files based on their file extensions. The viewer works for the following extensions:

- "Classic" HDF5: `.h5`, `.hdf5`
- [NeXus](https://www.nexusformat.org/): `.nexus`, `.nx`, `.nxs`
- [CXI](https://cxidb.org/cxi.html): `.cxi`

For other types of files, you can change the extension to one of the supported extensions or, if it is widespread, [open an issue](https://github.com/silx-kit/jupyterlab-h5web/issues) to discuss its support.

## Changelog

### 0.0.5

- Updated `@h5web/app` to version [0.0.11](https://github.com/silx-kit/h5web/releases/tag/v0.0.11)
- h5web has now a dark theme displayed when the JupyterLab's dark theme is on

### 0.0.4

- Added optional support of filters through `hdf5plugin`
- Added `.nexus`, `.nx`, `.nxs` and `.cxi` to the supported extensions
- Fixed unwanted background changes when switching themes in JupyterLab

### 0.0.3

- Added wheels

### 0.0.2

- Removed `npm` from the build process

### 0.0.1

- First release :tada:

## Troubleshoot

### Check the server extension

If you are seeing the frontend extension but it is not working, check
that `jupyterlab_hdf` is installed and enabled.

It should be listed when running:

```bash
jupyter serverextension list
```

If `jupyterlab_hdf` does not appear, try to install it manually:

```
pip install jupyterlab_hdf
```

and to enable it:

```
jupyter serverextension enable jupyterlab_hdf
```

### Check the frontend extension

If `jupyterlab_hdf` is installed and enabled but you are not seeing
the frontend, check the frontend is installed:

```bash
jupyter labextension list
```

If it is installed, try:

```bash
jupyter lab clean
jupyter lab build
```

## Uninstall

```bash
pip uninstall jupyterlab_h5web
jupyter labextension uninstall jupyterlab-h5web
```
