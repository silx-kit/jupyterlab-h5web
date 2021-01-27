export enum Command {
  openInH5web = 'h5web:open-in-h5web'
}

/* The file format is set for the following reasons:
  - A model data is fetched by the core JupyterLab according to the file format.
  - If set to `text`, the fetching fails by raising an error "The file is not UTF-8 encoded"
  - If set to `base64`, it succeeds but no use of this data is made in the extension.
  - Indeed, the fetching of HDF5 is completely enclosed in the H5web app. The file format should not be relevant.
As a result, this should be ideally changed for a cleaner solution that avoids fetching unnecessary data. */
export const HDF5_FILE_FORMAT = 'base64';

export const HDF5_FILE_TYPE = 'hdf5file';

export const HDF5_MIME_TYPE = 'application/x-hdf5';
