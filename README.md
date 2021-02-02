# jupyterlab-h5web

![Github Actions Status](https://github.com/loichuder/jupyterlab-h5web/workflows/Build/badge.svg)
[![PyPI version](https://badge.fury.io/py/jupyterlab-h5web.svg)](https://badge.fury.io/py/jupyterlab-h5web)

A JupyterLab extension to explore and visualize HDF5 file contents. Based on [h5web](https://github.com/silx-kit/h5web).

**WARNING: This extension is still in active development. Please report any encountered issue.**

![Extension screenshot](https://user-images.githubusercontent.com/42204205/106109102-6c280100-6149-11eb-96eb-38a14983702f.png)

## Requirements

- JupyterLab >= 2.0

## Install

Note: You will need NodeJS to install the extension.

```bash
pip install jupyterlab_h5web
jupyter lab build
```

## Usage

Once the extension is installed, you can double-click on an HDF5 file or right-click _Open with_ -> _h5web_ to launch a tab.

This tab is composed of a sidebar, where you can explore the structure of the HDF5 file, and of a main area where the visualization of the selected entity takes place. This visualization is controlled by the upper-right button that can toggle between:

- _Display_: visualize datasets using `Line`, `Heatmap` or `Matrix` visualizations.
- _Inspect_: show the metadata and attributes of any entity

## Troubleshoot

If you are seeing the frontend extension but it is not working, check
that the `jupyterlab_hdf` extension is enabled:

```bash
jupyter serverextension list
```

If the `jupyterlab_hdf` is installed and enabled but you are not seeing
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
