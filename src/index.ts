import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';

import {
  HDF5_FILE_TYPE,
  HDF5_MIME_TYPE,
  HDF5_FILE_FORMAT,
  Command,
  hdf5Icon,
  h5webIcon
} from './constants';
import H5webApp from './H5webApp';
import H5webWidgetFactory from './widget';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-h5web',
  autoStart: true,
  requires: [IFileBrowserFactory],
  activate: (app: JupyterFrontEnd, factory: IFileBrowserFactory): void => {
    console.log('JupyterLab extension jupyterlab-h5web is activated!');

    app.docRegistry.addFileType({
      name: HDF5_FILE_TYPE,
      icon: hdf5Icon,
      displayName: 'HDF5 File',
      extensions: ['.hdf5', '.h5'],
      mimeTypes: [HDF5_MIME_TYPE],
      fileFormat: HDF5_FILE_FORMAT
    });

    app.docRegistry.addWidgetFactory(
      new H5webWidgetFactory({
        defaultFor: [HDF5_FILE_TYPE],
        fileTypes: [HDF5_FILE_TYPE],
        name: 'h5web',
        readOnly: true,
        modelName: HDF5_FILE_FORMAT
      })
    );

    const { defaultBrowser } = factory;
    app.commands.addCommand(Command.openInH5web, {
      label: 'View HDF5 file contents',
      caption: 'Explore and visualize the contents of the HDF5 file',
      icon: h5webIcon,
      execute: () => {
        const file = defaultBrowser.selectedItems().next();

        const content = new H5webApp(file.path);
        const widget = new MainAreaWidget<H5webApp>({ content });
        widget.title.label = file.name;
        app.shell.add(widget, 'main');
      }
    });

    app.contextMenu.addItem({
      command: Command.openInH5web,
      selector: `.jp-DirListing-item[data-file-type=${HDF5_FILE_TYPE}]`,
      rank: 0
    });

    // runBackendTest();
  }
};

export default extension;
