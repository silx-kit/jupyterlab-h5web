import { JupyterFrontEnd } from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { buildIcon, runIcon } from '@jupyterlab/ui-components';

import {
  HDF5_FILE_TYPE,
  HDF5_MIME_TYPE,
  HDF5_FILE_FORMAT,
  Command
} from './models';
import H5webApp from './H5webApp';
import { requestAPI } from './jupyterlab-h5web';
import H5webWidgetFactory from './widget';

export function activateExtension(
  app: JupyterFrontEnd,
  factory: IFileBrowserFactory
): void {
  console.log('JupyterLab extension jupyterlab-h5web is activated!');

  app.docRegistry.addFileType({
    name: HDF5_FILE_TYPE,
    icon: buildIcon,
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
    icon: runIcon,
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

export async function runBackendTest(): Promise<void> {
  try {
    // TODO: To fix by adding a test handler to the backend
    const data = await requestAPI<any>('get_example');
    console.log(data);
  } catch (error) {
    console.error(
      `The jupyterlab_hdf server extension appears to be missing.\n${error}`
    );
  }
}
