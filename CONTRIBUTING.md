# Contributing

## Install

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Move to jupyterlab-h5web directory

# Install package in development mode
pip install -e .
# Ensure that `jupyterlab_h5web` server extension is present and enabled
jupyter serverextension list

# Install dependencies
jlpm
# Build Typescript source
jlpm build
# Link your development version of the extension with JupyterLab
jupyter labextension install .
# Rebuild Typescript source after making changes
jlpm build
# Rebuild JupyterLab after making any changes
jupyter lab build
```

You can watch the source directory and run JupyterLab in watch mode to watch for
changes in the extension's source and automatically rebuild the extension and
application.

```bash
# Watch the source directory in another terminal tab
jlpm watch
# Run jupyterlab in watch mode in one terminal tab
jupyter lab --watch
```

Now every change will be built locally and bundled into JupyterLab. Be sure to
refresh your browser page after saving file changes to reload the extension
(note: you'll need to wait for webpack to finish, which can take 10s+ at times).

## Formatting

This extension uses `prettier` to format `*.ts` files and `black` to format
`*.py` files.

## PyPI package metadata

The metadata (author, licence, version...) is set in `package.json` that acts as
a the single source of truth. The metadata of the PyPI package (`setup.py`) is
fetched from `package.json`.

## Release process

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
