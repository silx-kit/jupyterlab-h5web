import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';

import { activateExtension } from './utils';

/**
 * Initialization data for the jupyterlab-h5web extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-h5web',
  autoStart: true,
  requires: [IFileBrowserFactory],
  activate: activateExtension
};

export default extension;
