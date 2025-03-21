import type { JupyterFrontEnd } from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { PathExt } from '@jupyterlab/coreutils';
import type { IDocumentManager } from '@jupyterlab/docmanager';
import type { DocumentRegistry } from '@jupyterlab/docregistry';
import type { IDefaultFileBrowser } from '@jupyterlab/filebrowser';
import type { Kernel } from '@jupyterlab/services';

import HDF5_FILE_TYPE from './fileType';
import { h5webIcon } from './icons';
import H5webWidgetFactory, { H5webWidget } from './widget';

const OPEN_H5WEB_COMMAND = 'h5web-open';

// Patch the opening of HDF5 files. This is to bypass the core JupyterLab circuitry that fetches the base64 blob (see the comment in fileType.ts)
const PATCH_OPENING = true;

// Add special handling for HDF files to the function handling file openings (docManager.open)
export function patchOpeningOfHdf5File(
  app: JupyterFrontEnd,
  docManager: IDocumentManager,
): void {
  const { commands } = app;

  const normalOpen = docManager.open;
  docManager.open = (
    path: string,
    widgetName = 'default',
    kernel?: Partial<Kernel.IModel>,
    options?: DocumentRegistry.IOpenOptions,
  ) => {
    if (HDF5_FILE_TYPE.extensions.includes(PathExt.extname(path))) {
      commands.execute(OPEN_H5WEB_COMMAND);
      return undefined;
    }
    // If it is not a HDF5 file, handle the opening "normally"
    return normalOpen.call(docManager, path, widgetName, kernel, options);
  };
}

export function activateOpenInBrowser(
  app: JupyterFrontEnd,
  browser: IDefaultFileBrowser,
  docManager: IDocumentManager,
): void {
  const { commands } = app;
  commands.addCommand(OPEN_H5WEB_COMMAND, {
    label: 'View HDF5 file contents',
    caption: 'Explore and visualize the contents of the HDF5 file',
    icon: h5webIcon,
    execute: () => {
      const file = browser.selectedItems().next();

      // https://github.com/silx-kit/jupyterlab-h5web/issues/121
      const rawPath = file.value.path as string;
      const path = rawPath.startsWith('RTC:')
        ? rawPath.slice(4, rawPath.length)
        : rawPath;

      const content = new H5webWidget(path);
      const widget = new MainAreaWidget<H5webWidget>({ content });
      widget.title.label = file.value.name;
      app.shell.add(widget, 'main');
    },
  });

  if (PATCH_OPENING) {
    patchOpeningOfHdf5File(app, docManager);

    // Add a context menu entry as not calling `addWidgetFactory` removes the "Open with... h5web" entry
    app.contextMenu.addItem({
      command: OPEN_H5WEB_COMMAND,
      selector: `.jp-DirListing-item[data-file-type="${HDF5_FILE_TYPE.name}"]`,
      rank: 0,
    });
  } else {
    app.docRegistry.addWidgetFactory(
      new H5webWidgetFactory({
        defaultFor: [HDF5_FILE_TYPE.name],
        fileTypes: [HDF5_FILE_TYPE.name],
        name: 'jupyterlab-h5web:main',
        readOnly: true,
        modelName: HDF5_FILE_TYPE.fileFormat,
      }),
    );
  }
}
