import { App, getFeedbackMailto, H5GroveProvider } from '@h5web/app';
import { ServerConnection } from '@jupyterlab/services';
import { useMemo } from 'react';

const FEEDBACK_EMAIL = 'h5web@esrf.fr';

function H5WebApp(props: { filePath: string }) {
  const { filePath } = props;
  const { baseUrl, token } = ServerConnection.makeSettings();

  const axiosConfig = useMemo(
    () => ({
      params: { file: filePath },
      headers: token ? { Authorization: `token ${token}` } : {},
    }),
    [filePath, token],
  );

  return (
    <div className="h5web-root">
      <H5GroveProvider
        url={`${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}/h5web`}
        filepath={filePath}
        axiosConfig={axiosConfig}
      >
        <App
          getFeedbackURL={(context) =>
            getFeedbackMailto(context, FEEDBACK_EMAIL)
          }
          disableDarkMode
        />
      </H5GroveProvider>
    </div>
  );
}

export default H5WebApp;
