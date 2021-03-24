import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';
import { createRendermimePlugins } from '@jupyterlab/application/lib/mimerenderers';
import * as mimeExtension from './mimeplugin';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';

import HDF5_FILE_TYPE from './fileType';
import H5webWidgetFactory from './widget';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-h5web',
  autoStart: true,
  requires: [IRenderMimeRegistry],
  activate: (app: JupyterFrontEnd, rendermime: IRenderMimeRegistry): void => {
    // eslint-disable-next-line no-console
    console.log('JupyterLab extension jupyterlab-h5web is activated!');

    app.docRegistry.addFileType(HDF5_FILE_TYPE);

    app.docRegistry.addWidgetFactory(
      new H5webWidgetFactory({
        defaultFor: [HDF5_FILE_TYPE.name],
        fileTypes: [HDF5_FILE_TYPE.name],
        name: 'jupyterlab-h5web:main',
        readOnly: true,
        modelName: 'base64',
      })
    );

    const [mimePlugin] = createRendermimePlugins([mimeExtension]);
    app.registerPlugin(mimePlugin);
    mimePlugin.activate(app, rendermime);

    // runBackendTest();
  },
};

export default extension;
