"""
Setup Module to setup Python Handlers for the jupyterlab-h5web extension.
"""
import os

from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    get_version,
)
import setuptools

HERE = os.path.abspath(os.path.dirname(__file__))

# The name of the project
name = "jupyterlab_h5web"

# Get our version
version = get_version(os.path.join(name, "_version.py"))

lab_path = os.path.join(HERE, name, "labextension")

# Representative files that should exist after a successful build
jstargets = [
    os.path.join(HERE, "lib", "jupyterlab-h5web.js"),
]

package_data_spec = {name: ["*"]}

data_files_spec = [
    ("share/jupyter/lab/extensions", lab_path, "*.tgz"),
    (
        "etc/jupyter/jupyter_notebook_config.d",
        "jupyter-config",
        "jupyterlab_h5web.json",
    ),
]

cmdclass = create_cmdclass(
    "jsdeps", package_data_spec=package_data_spec, data_files_spec=data_files_spec
)

cmdclass["jsdeps"] = combine_commands(
    install_npm(HERE, build_cmd="build:all", npm=["jlpm"]), ensure_targets(jstargets),
)

with open("README.md", "r") as fh:
    long_description = fh.read()

setup_args = dict(
    name=name,
    version=version,
    url="https://github.com/loichuder/jupyterlab-h5web",
    author="Loic Huder",
    description="A JupyterLab extension to explore and visualize HDF5 file contents",
    long_description=long_description,
    long_description_content_type="text/markdown",
    cmdclass=cmdclass,
    packages=setuptools.find_packages(),
    install_requires=["jupyterlab~=2.0", "jupyterlab_hdf"],
    python_requires=">=3.6",
    zip_safe=False,
    include_package_data=True,
    license="MIT",
    platforms="Linux, Mac OS X, Windows",
    keywords=["Jupyter", "JupyterLab"],
    classifiers=[
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Framework :: Jupyter",
    ],
)


if __name__ == "__main__":
    setuptools.setup(**setup_args)
