import { LabIcon } from '@jupyterlab/ui-components';
import hdf5IconSvg from '../style/hdf5-icon.svg';
import h5webIconSvg from '../style/h5web-icon.svg';

/* The file format is set for the following reasons:
  - A model data is fetched by the core JupyterLab according to the file format.
  - If set to `text`, the fetching fails by raising an error "The file is not UTF-8 encoded"
  - If set to `base64`, it succeeds but no use of this data is made in the extension.
  - Indeed, the fetching of HDF5 is completely enclosed in the H5web app. The file format should not be relevant.
As a result, this should be ideally changed for a cleaner solution that avoids fetching unnecessary data. */
export const HDF5_FILE_FORMAT = 'base64';

export const HDF5_FILE_TYPE = 'hdf5file';

export const HDF5_MIME_TYPE = 'application/x-hdf5';

export const HDF5_EXTENSIONS = [
  '.hdf5',
  '.h5',
  '.nexus',
  '.nx',
  '.nxs',
  '.cxi',
];

export const hdf5Icon = new LabIcon({
  name: 'hdf5-icon',
  svgstr: hdf5IconSvg,
});

export const h5webIcon = new LabIcon({
  name: 'h5web-icon',
  svgstr: h5webIconSvg,
});
