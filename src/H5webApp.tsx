/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import { App, JupyterProvider } from '@h5web/app';
import { ServerConnection } from '@jupyterlab/services';

class H5webApp extends ReactWidget {
  readonly filePath: string;

  constructor(filePath: string) {
    super();
    this.addClass('jp-ReactWidget');
    this.filePath = filePath;
  }

  render(): JSX.Element {
    const { baseUrl } = ServerConnection.makeSettings();

    return (
      <JupyterProvider
        url={baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}
        domain={this.filePath}
      >
        <App />
      </JupyterProvider>
    );
  }
}

export default H5webApp;
