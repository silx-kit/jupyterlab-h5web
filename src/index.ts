import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { createRendermimePlugins } from '@jupyterlab/application/lib/mimerenderers';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';

import { activateOpenInBrowser } from './browser';
import HDF5_FILE_TYPE from './fileType';
// eslint-disable-next-line import/no-namespace
import * as mimeExtension from './mimeplugin';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-h5web',
  autoStart: true,
  requires: [IFileBrowserFactory, IRenderMimeRegistry],
  activate: (
    app: JupyterFrontEnd,
    factory: IFileBrowserFactory,
    rendermime: IRenderMimeRegistry
  ): void => {
    // eslint-disable-next-line no-console
    console.log('JupyterLab extension jupyterlab-h5web is activated!');

    app.docRegistry.addFileType(HDF5_FILE_TYPE);

    const [mimePlugin] = createRendermimePlugins([mimeExtension]);
    app.registerPlugin(mimePlugin);
    mimePlugin.activate(app, rendermime);

    activateOpenInBrowser(app, factory.defaultBrowser);
  },
};

export default extension;
