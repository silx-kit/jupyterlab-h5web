import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import {
  HDF5_FILE_TYPE,
  HDF5_MIME_TYPE,
  HDF5_FILE_FORMAT,
  HDF5_EXTENSIONS,
  hdf5Icon,
} from './constants';
import H5webWidgetFactory from './widget';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-h5web',
  autoStart: true,
  activate: (app: JupyterFrontEnd): void => {
    // eslint-disable-next-line no-console
    console.log('JupyterLab extension jupyterlab-h5web is activated!');

    app.docRegistry.addFileType({
      name: HDF5_FILE_TYPE,
      icon: hdf5Icon,
      displayName: 'HDF5 File',
      extensions: HDF5_EXTENSIONS,
      mimeTypes: [HDF5_MIME_TYPE],
      fileFormat: HDF5_FILE_FORMAT,
    });

    app.docRegistry.addWidgetFactory(
      new H5webWidgetFactory({
        defaultFor: [HDF5_FILE_TYPE],
        fileTypes: [HDF5_FILE_TYPE],
        name: 'h5web',
        readOnly: true,
        modelName: HDF5_FILE_FORMAT,
      })
    );

    // runBackendTest();
  },
};

export default extension;
