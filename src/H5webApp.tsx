/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import { App, JupyterProvider } from '@h5web/app';
import { ServerConnection } from '@jupyterlab/services';
import { h5webIcon } from './constants';

// Render the App twice on mount as the CSS is not loaded at first render.
function TwoRenderApp(): JSX.Element {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  if (isFirstRender) {
    return <></>;
  }

  return <App />;
}

class H5webApp extends ReactWidget {
  readonly filePath: string;

  constructor(filePath: string) {
    super();
    this.addClass('jp-ReactWidget');
    this.filePath = filePath;
    this.title.icon = h5webIcon;
  }

  render(): JSX.Element {
    const { baseUrl } = ServerConnection.makeSettings();

    return (
      <JupyterProvider
        url={baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}
        domain={this.filePath}
      >
        <TwoRenderApp />
      </JupyterProvider>
    );
  }
}

export default H5webApp;
