import { requestAPI } from './jupyterlab-h5web';

export async function runBackendTest(): Promise<void> {
  try {
    // TODO: To fix by adding a test handler to the backend
    const data = await requestAPI<any>('get_example');
    console.log(data);
  } catch (error) {
    console.error(
      `The jupyterlab_hdf server extension appears to be missing.\n${error}`
    );
  }
}
