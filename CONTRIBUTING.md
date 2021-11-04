# Contributing

## Install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_h5web directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Server extension must be manually installed in develop mode
jupyter server extension enable jupyterlab_h5web
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in
different terminals to watch for changes in the extension's source and
automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built
locally and available in your running JupyterLab. Refresh JupyterLab to load the
change in your browser (you may need to wait several seconds for the extension
to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this
extension to make it easier to debug using the browser dev tools. To also
generate source maps for the JupyterLab core extensions, you can run the
following command:

```bash
jupyter lab build --minimize=False
```

## Development uninstall

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

## Formatting

This extension uses `prettier` to format `*.ts` files and `black` to format
`*.py` files.

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
