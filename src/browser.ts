import { JupyterFrontEnd } from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { PathExt } from '@jupyterlab/coreutils';
import { DirListing, FileBrowser } from '@jupyterlab/filebrowser';
import { Contents } from '@jupyterlab/services';

import HDF5_FILE_TYPE from './fileType';
import { h5webIcon } from './icons';
import H5webWidgetFactory, { H5webWidget } from './widget';

const OPEN_H5WEB_COMMAND = 'h5web-open';

// Patch the opening of HDF5 files. This is to bypass the core JupyterLab circuitry that fetches the base64 blob (see the comment in fileType.ts)
const PATCH_OPENING = true;

export function getBrowserListing(browser: FileBrowser): DirListing {
  if ('listing' in browser) {
    // @ts-ignore
    return browser.listing; // JLab 3
  }

  // @ts-ignore
  return browser._listing; // JLab 2
}

// Reimplementation of the double-click/Enter handling that adds the special handling for HDF files
// https://github.com/jupyterlab/jupyterlab/blob/256d18253ec2733431a3289691b6a16766d4469c/packages/filebrowser/src/listing.ts#L1006
export function patchOpeningOfHdf5File(
  app: JupyterFrontEnd,
  browser: FileBrowser
): void {
  const { commands } = app;
  const listing = getBrowserListing(browser);

  // Reimplementation of handleOpen that add the special handling for HDF files
  // https://github.com/jupyterlab/jupyterlab/blob/2.3.x/packages/filebrowser/src/listing.ts#L935
  function handleOpen(item: Contents.IModel, event: Event): void {
    if (!item) {
      return;
    }

    const extname = PathExt.extname(item.path);
    if (HDF5_FILE_TYPE.extensions.includes(extname)) {
      commands.execute(OPEN_H5WEB_COMMAND);
    } else {
      // If it is not a HDF5 file, handle the event "normally"
      listing.handleEvent(event);
    }
  }

  function handleDblClick(evt: Event): void {
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
    handleOpen(item, event);
  }

  function handleKeyDown(evt: Event): void {
    const event = evt as KeyboardEvent;
    if (event.key !== 'Enter') {
      listing.handleEvent(event);
      return;
    }

    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    const item = browser.selectedItems().next();
    handleOpen(item, event);
  }

  browser.node.addEventListener('dblclick', handleDblClick, true);
  browser.node.addEventListener('keydown', handleKeyDown, true);
}

export function activateOpenInBrowser(
  app: JupyterFrontEnd,
  browser: FileBrowser
) {
  const { commands } = app;
  commands.addCommand(OPEN_H5WEB_COMMAND, {
    label: 'View HDF5 file contents',
    caption: 'Explore and visualize the contents of the HDF5 file',
    icon: h5webIcon,
    execute: () => {
      const file = browser.selectedItems().next();

      const content = new H5webWidget(file.path);
      const widget = new MainAreaWidget<H5webWidget>({ content });
      widget.title.label = file.name;
      app.shell.add(widget, 'main');
    },
  });

  if (PATCH_OPENING) {
    patchOpeningOfHdf5File(app, browser);

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
      })
    );
  }
}
