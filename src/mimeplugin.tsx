/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { Widget } from '@lumino/widgets';

import React from 'react';
//@ts-ignore
import ReactDOM from 'react-dom';

import HDF5_FILE_TYPE from './fileType';
import H5webApp from './H5webApp';

class HDF5FilePathRenderer extends Widget implements IRenderMime.IRenderer {
  /* Renders HDF5 files from their path with H5web */
  mimeType: string;

  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this.mimeType = options.mimeType;
  }

  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    const path = model.data[this.mimeType];
    if (typeof path !== 'string') {
      throw new TypeError('Expected string');
    }
    return new Promise<void>((resolve, reject) => {
      ReactDOM.render(
        <div style={{ height: '400px' }}>
          <H5webApp filePath={path} />
        </div>,
        this.node,
        () => {
          resolve();
        }
      );
    });
  }
}

const extension: IRenderMime.IExtension = {
  id: 'jupyter-h5web:mime-plugin',
  rendererFactory: {
    safe: true,
    mimeTypes: HDF5_FILE_TYPE.mimeTypes,
    createRenderer: options => new HDF5FilePathRenderer(options)
  },
  rank: 0,
  dataType: 'string'
};

export default extension;
