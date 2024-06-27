import type { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { Widget } from '@lumino/widgets';

import React from 'react';
import { createRoot } from 'react-dom/client';

import HDF5_FILE_TYPE from './fileType';
import H5WebInCell from './H5WebInCell';

class HDF5FilePathRenderer extends Widget implements IRenderMime.IRenderer {
  /* Renders HDF5 files from their path with H5web */
  private readonly mimeType: string;

  public constructor(options: IRenderMime.IRendererOptions) {
    super();
    this.mimeType = options.mimeType;
  }

  public renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    const path = model.data[this.mimeType];
    if (typeof path !== 'string') {
      throw new TypeError('Expected string');
    }

    createRoot(this.node).render(<H5WebInCell path={path} />);
    return Promise.resolve();
  }
}

const extension: IRenderMime.IExtension = {
  id: 'jupyter-h5web:mime-plugin',
  rendererFactory: {
    safe: true,
    mimeTypes: HDF5_FILE_TYPE.mimeTypes,
    createRenderer: (options) => new HDF5FilePathRenderer(options),
  },
  rank: 0,
  dataType: 'string',
};

export default extension;
