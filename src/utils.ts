import { JupyterFrontEnd } from '@jupyterlab/application';
import { requestAPI } from './jupyterlab-h5web';
import { FileBrowser, IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { Command } from './models';
import { buildIcon, runIcon } from '@jupyterlab/ui-components';

import { MainAreaWidget } from '@jupyterlab/apputils';

import H5webApp from './H5webApp';
import { PathExt } from '@jupyterlab/coreutils';

export function activateExtension(
  app: JupyterFrontEnd,
  factory: IFileBrowserFactory
): void {
  console.log('JupyterLab extension jupyterlab-h5web is activated!');

  app.docRegistry.addFileType({
    name: 'hdf5file',
    icon: buildIcon,
    displayName: 'HDF5 File',
    extensions: ['.hdf5', '.h5'],
    fileFormat: 'json',
    contentType: 'directory',
    mimeTypes: ['hdf5']
  });

  app.commands.addCommand(Command.openInH5web, {
    label: 'View HDF5 file contents',
    caption: 'Explore and visualize the contents of the HDF5 file',
    icon: runIcon,
    execute: () => {
      const file = factory.tracker.currentWidget.selectedItems().next();

      const content = new H5webApp(file.path);
      const widget = new MainAreaWidget<H5webApp>({ content });
      widget.title.label = file.name;
      app.shell.add(widget, 'main');
    }
  });

  app.contextMenu.addItem({
    command: Command.openInH5web,
    selector: '.jp-DirListing-item[data-file-type="hdf5file"]',
    rank: 0
  });

  addDoubleClickFeature(app, factory.defaultBrowser);

  // runBackendTest();
}

export async function runBackendTest(): Promise<void> {
  try {
    // TODO: To fix by adding a test handler to the backend
    const data = await requestAPI<any>('get_example');
    console.log(data);
  } catch (error) {
    console.error(
      `The jupyterlab_h5web server extension appears to be missing.\n${error}`
    );
  }
}

export function addDoubleClickFeature(
  app: JupyterFrontEnd,
  browser: FileBrowser
): void {
  const { commands } = app;

  const handleDblClick = async (evt: Event): Promise<void> => {
    const event = evt as MouseEvent;
    // Do nothing if it's not a left mouse press.
    if (event.button !== 0) {
      return;
    }

    // Do nothing if any modifier keys are pressed.
    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
      return;
    }

    // Stop the event propagation.
    event.preventDefault();
    event.stopPropagation();

    const item = browser.modelForClick(event);
    if (!item) {
      return;
    }

    const { contents } = browser.model.manager.services;
    const extname = PathExt.extname(item.path);
    if (extname === '.hdf5' || extname === '.h5') {
      // special handling for .hdf5 files
      commands.execute(Command.openInH5web);
    } else if (item.type === 'directory') {
      try {
        await browser.model.cd('/' + contents.localPath(item.path));
      } catch (error) {
        console.error(error);
      }
    } else {
      browser.model.manager.openOrReveal(item.path);
    }
  };

  browser.node.addEventListener('dblclick', handleDblClick, true);
}
