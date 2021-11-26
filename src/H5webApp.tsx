import React, { useEffect, useState } from 'react';
import { App, H5GroveProvider } from '@h5web/app';
import { ServerConnection } from '@jupyterlab/services';

// Render the App twice on mount as the CSS is not loaded at first render.
function TwoRenderApp() {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  if (isFirstRender) {
    return null;
  }

  return <App />;
}

function H5webApp(props: { filePath: string }) {
  const { filePath } = props;
  const { baseUrl } = ServerConnection.makeSettings();

  return (
    <div className="h5web-root">
      <H5GroveProvider
        url={`${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}/h5web`}
        filepath={filePath}
        axiosParams={{ file: filePath }}
      >
        <TwoRenderApp />
      </H5GroveProvider>
    </div>
  );
}

export default H5webApp;
