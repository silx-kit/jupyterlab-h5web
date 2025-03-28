import {
  type JupyterFrontEnd,
  type JupyterFrontEndPlugin,
} from '@jupyterlab/application';
import { createRendermimePlugins } from '@jupyterlab/application/lib/mimerenderers';
import { IDocumentManager } from '@jupyterlab/docmanager';
import { IDefaultFileBrowser } from '@jupyterlab/filebrowser';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';

import { activateOpenInBrowser } from './browser';
import HDF5_FILE_TYPE from './fileType';
// eslint-disable-next-line import/no-namespace
import * as mimeExtension from './mimeplugin';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-h5web',
  autoStart: true,
  requires: [IDefaultFileBrowser, IRenderMimeRegistry, IDocumentManager],
  activate: (
    app: JupyterFrontEnd,
    defaultFileBrowser: IDefaultFileBrowser,
    rendermime: IRenderMimeRegistry,
    docManager: IDocumentManager,
  ): void => {
    // eslint-disable-next-line no-console
    console.log('JupyterLab extension jupyterlab-h5web is activated!');

    app.docRegistry.addFileType(HDF5_FILE_TYPE);

    const [mimePlugin] = createRendermimePlugins([mimeExtension]);
    app.registerPlugin(mimePlugin); // eslint-disable-line @typescript-eslint/no-unsafe-argument
    void mimePlugin.activate(app, rendermime);

    activateOpenInBrowser(app, defaultFileBrowser, docManager);
  },
};

export default extension;
