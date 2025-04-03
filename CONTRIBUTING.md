# Contributing

## Install

1. Clone the repo locally and navigate in the created folder
2. Prepare a virtual environment with `mamba`, `conda` or `micromamba`
3. Run the following commands in your newly created environment

```bash
# Prepare environment (replace `mamba` by `conda` if needed)
mamba install -c conda-forge nodejs=22 jupyterlab==4 jupyter-packaging jupyterlab-h5web

# Install package in development mode
pip install -e .

# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# Server extension must be manually enabled in develop mode
jupyter server extension enable jupyterlab_h5web

# Rebuild extension Typescript source after making changes
jlpm build
```

## Develop

```bash
# Start JupyterLab
jupyter lab

# In a separate terminal, watch and rebuild the front-end automatically
jlpm run watch

# Alternatively, rebuild when needed
jlpm run build
```

Whenever the front-end rebuilds, make sure to **refresh** JupyterLab in your
browser to see the changes.

By default, `jlpm run build` builds the front-end in development mode and
generates source maps for easier debugging with the browser dev tools. To also
generate source maps for the JupyterLab core extensions, run:

```bash
jupyter lab build --minimize=False
```

> Unfortunately, building the front-end in development mode
> [breaks](https://github.com/silx-kit/jupyterlab-h5web/issues/67) H5Web's
> R3F-based visualisations (_Heatmap_, _Line_, etc.) The current workaround is
> to built in production mode with `jlpm run build:prod`.

## Uninstall

```bash
# Server extension must be manually disabled in develop mode
jupyter server extension disable jupyterlab_h5web
pip uninstall jupyterlab_h5web
```

In development mode, you will also need to remove the symlink created by
`jupyter labextension develop` command. To find its location, you can run
`jupyter labextension list` to figure out where the `labextensions` folder is
located. Then you can remove the symlink named `jupyterlab-h5web` within that
folder.

## Format

This extension uses `prettier` to format `*.ts` files and `black` to format
`*.py` files.

## Release

The release process is adapted from
[the one from h5web](https://github.com/silx-kit/h5web/blob/main/CONTRIBUTING.md#release-process).

To release a new version:

1. Check out `main` and pull the latest changes.
1. Make sure your working tree doesn't have uncommitted changes and that the
   latest commit on `main` has passed the CI.
1. Run `npm version [ patch | minor | major | <new-version> ]`

This command bumps the version number in `package.json`, commits the change and
then tags the commit with the same version number. The `postversion` script then
runs automatically and pushes the new commit and the new tag. This, in turn,
triggers the _Release_ workflow on the CI, which builds and publishes the
package to PyPI.

Once the _Release_ worklow has completed:

- Make sure the new package version is available on PyPI
- Write and publish
  [release notes](https://github.com/silx-kit/jupyterlab-h5web/releases) on
  GitHub.
