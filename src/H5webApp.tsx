import React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import { SilxProvider, App } from '@h5web/app';
import '~@h5web/app/app.css';

class H5webApp extends ReactWidget {
  readonly filePath: string;

  constructor(filePath: string) {
    super();
    this.addClass('jp-ReactWidget');
    this.filePath = filePath;
  }

  render(): JSX.Element {
    console.log(this.filePath);
    return (
      <SilxProvider domain="bsa_002_000-integrate-sub">
        <App />
      </SilxProvider>
    );
  }
}

export default H5webApp;
