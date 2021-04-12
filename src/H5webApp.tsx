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
    return null;
  }

  return <App />;
}

class H5webApp extends ReactWidget {
  private readonly filePath: string;

  public constructor(filePath: string) {
    super();
    this.addClass('jp-ReactWidget');
    this.filePath = filePath;
    this.title.icon = h5webIcon;
  }

  public render(): JSX.Element {
    const { baseUrl } = ServerConnection.makeSettings();

    return (
      <div className="h5web-root">
        <JupyterProvider
          url={baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}
          filepath={this.filePath}
        >
          <TwoRenderApp />
        </JupyterProvider>
      </div>
    );
  }
}

export default H5webApp;
