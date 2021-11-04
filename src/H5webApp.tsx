import React from 'react';
import { App, H5GroveProvider } from '@h5web/app';
import { ServerConnection } from '@jupyterlab/services';

function H5webApp(props: { filePath: string }) {
  const { filePath } = props;
  const { baseUrl } = ServerConnection.makeSettings();

  return (
    <div className="h5web-root">
      <H5GroveProvider
        url={`${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}/h5web`}
        filepath={filePath}
      >
        <App />
      </H5GroveProvider>
    </div>
  );
}

export default H5webApp;
