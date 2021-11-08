from pathlib import Path
import json

from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
)
import setuptools

HERE = Path(__file__).parent.resolve()

# The name of the project
name = "jupyterlab_h5web"

# Get the package info from package.json
pkg_json = json.loads((HERE / "package.json").read_bytes())

lab_path = HERE / name / "labextension"

# Representative files that should exist after a successful build
jstargets = [
    str(HERE / "lib" / "index.js"),
]

package_data_spec = {name: ["*"]}

data_files_spec = [
    ("share/jupyter/lab/extensions", str(lab_path), "*.tgz"),
    (
        "etc/jupyter/jupyter_notebook_config.d",
        "jupyter-config",
        "jupyterlab-h5web.json",
    ),
]

cmdclass = create_cmdclass(
    "jsdeps", package_data_spec=package_data_spec, data_files_spec=data_files_spec
)

cmdclass["jsdeps"] = combine_commands(
    install_npm(HERE, build_cmd="build:all", npm=["jlpm"]),
    ensure_targets(jstargets),
)

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
    cmdclass=cmdclass,
    packages=setuptools.find_packages(),
    install_requires=["jupyter_server>=1.6,<2", "h5grove==0.0.11"],
    extras_require={"full": ["hdf5plugin"]},
    python_requires=">=3.6",
    zip_safe=False,
    include_package_data=True,
    platforms="Linux, Mac OS X, Windows",
    keywords=["Jupyter", "JupyterLab"],
    classifiers=[
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Framework :: Jupyter",
        "Topic :: Scientific/Engineering :: Visualization",
    ],
)


if __name__ == "__main__":
    setuptools.setup(**setup_args)
