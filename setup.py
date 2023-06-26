from pathlib import Path
import json
import setuptools

try:
    from jupyter_packaging import wrap_installers, npm_builder, get_data_files
except ImportError as e:
    raise ImportError(
        "Build tool `jupyter-packaging` is missing. Install it with pip or conda."
    ) from e

HERE = Path(__file__).parent.resolve()

# The name of the project
name = "jupyterlab_h5web"

# Get the package info from package.json
pkg_json = json.loads((HERE / "package.json").read_bytes())

lab_path = HERE / name / Path("labextension")
labext_name = "jupyterlab-h5web"
app_suffix = Path("share/jupyter/labextensions")
config_suffix = Path("etc/jupyter")

package_data_spec = {name: ["*"]}

data_files_spec = [
    (str(app_suffix / labext_name), str(lab_path.relative_to(HERE)), "**"),
    (str(app_suffix / labext_name), ".", "install.json"),
    (
        str(config_suffix / "jupyter_server_config.d"),
        "jupyter-config/server-config",
        "jupyterlab_h5web.json",
    ),
    # For backward compatibility with notebook server
    (
        str(config_suffix / "jupyter_notebook_config.d"),
        "jupyter-config/nb-config",
        "jupyterlab_h5web.json",
    ),
]

long_description = (HERE / "README.md").read_text()


setup_args = dict(
    name=name,
    version=pkg_json["version"],
    url=pkg_json["homepage"],
    author=pkg_json["author"]["name"],
    author_email=pkg_json["author"]["email"],
    description=pkg_json["description"],
    license=pkg_json["license"],
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=setuptools.find_packages(),
    install_requires=["jupyter_server>=1.6,<3", "h5grove==1.3.0", "h5py>=3.5"],
    extras_require={"full": ["hdf5plugin"]},
    python_requires=">=3.8",
    zip_safe=False,
    include_package_data=True,
    platforms="Linux, Mac OS X, Windows",
    keywords=["Jupyter", "JupyterLab", "JupyterLab3", "JupyterLab4"],
    classifiers=[
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Framework :: Jupyter",
        "Framework :: Jupyter :: JupyterLab",
        "Framework :: Jupyter :: JupyterLab :: 3",
        "Framework :: Jupyter :: JupyterLab :: 4",
        "Framework :: Jupyter :: JupyterLab :: Extensions",
        "Framework :: Jupyter :: JupyterLab :: Extensions :: Prebuilt",
        "Topic :: Scientific/Engineering :: Visualization",
    ],
)

# Representative files that should exist after a successful build
ensured_targets = [str(lab_path / "package.json"), str(lab_path / "static/style.js")]

post_develop = npm_builder(
    build_cmd="install:extension", source_dir="src", build_dir=lab_path
)
setup_args["cmdclass"] = wrap_installers(
    post_develop=post_develop, ensured_targets=ensured_targets
)
setup_args["data_files"] = get_data_files(data_files_spec)


if __name__ == "__main__":
    setuptools.setup(**setup_args)
