import type { DocumentRegistry } from '@jupyterlab/docregistry';
import { hdf5Icon } from './icons';

/* The file format is set for the following reasons:
  - A model data is fetched by the core JupyterLab according to the file format.
  - If set to `text`, the fetching fails by raising an error "The file is not UTF-8 encoded"
  - If set to `base64`, it succeeds but no use of this data is made in the extension.
  - Indeed, the fetching of HDF5 is completely enclosed in the H5web app. The file format should not be relevant.
As a result, this should be ideally changed for a cleaner solution that avoids fetching unnecessary data. */
const HDF5_FILE_TYPE: Partial<DocumentRegistry.IFileType> = {
  name: 'hdf5file',
  icon: hdf5Icon,
  displayName: 'HDF5 File',
  extensions: ['.cxi', '.hdf', '.hdf5', '.h5', '.nexus', '.nx', '.nx5', '.nxs'],
  mimeTypes: ['application/x-hdf5'],
  fileFormat: 'base64' as const,
};

export default HDF5_FILE_TYPE;
