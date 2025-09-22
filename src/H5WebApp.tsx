import {
  App,
  createBasicFetcher,
  getFeedbackMailto,
  H5GroveProvider,
} from '@h5web/app';
import { ServerConnection } from '@jupyterlab/services';
import { useMemo } from 'react';

const FEEDBACK_EMAIL = 'h5web@esrf.fr';

function H5WebApp(props: { filePath: string }) {
  const { filePath } = props;
  const { baseUrl, token } = ServerConnection.makeSettings();

  const fetcher = useMemo(() => {
    return createBasicFetcher({
      headers: token ? { Authorization: `token ${token}` } : {},
    });
  }, [token]);

  return (
    <div className="h5web-root">
      <H5GroveProvider
        url={`${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}/h5web`}
        filepath={filePath}
        fetcher={fetcher}
      >
        <App
          disableDarkMode
          getFeedbackURL={(context) => {
            return getFeedbackMailto(context, FEEDBACK_EMAIL);
          }}
        />
      </H5GroveProvider>
    </div>
  );
}

export default H5WebApp;
