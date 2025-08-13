import { type DocumentRegistry } from '@jupyterlab/docregistry';

import { hdf5Icon } from './icons';

/* The file format is set for the following reasons:
  - A model data is fetched by the core JupyterLab according to the file format.
  - If set to `text`, the fetching fails by raising an error "The file is not UTF-8 encoded"
  - If set to `base64`, it succeeds but no use of this data is made in the extension.
  - Indeed, the fetching of HDF5 is completely enclosed in the H5Web app. The file format should not be relevant.
As a result, this should be ideally changed for a cleaner solution that avoids fetching unnecessary data. */
const HDF5_FILE_TYPE = {
  name: 'hdf5file',
  icon: hdf5Icon,
  displayName: 'HDF5 File',
  extensions: [
    '.h5',
    '.hdf',
    '.hdf5',
    '.hf5',
    '.nx',
    '.nxs',
    '.nx5',
    '.nexus',
    '.cxi',
    '.nc',
    '.nc4',
    '.loom',
    '.jld2',
    '.h5ebsd',
    '.edaxh5',
    '.oh5',
    '.dream3d',
    '.geoh5',
    '.h5oina',
  ],
  mimeTypes: ['application/x-hdf5'],
  fileFormat: 'base64' as const,
} satisfies Partial<DocumentRegistry.IFileType>;

export default HDF5_FILE_TYPE;
