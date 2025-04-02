import { ReactWidget } from '@jupyterlab/apputils';

import H5WebApp from './H5WebApp';
import { h5webIcon } from './icons';

export class H5WebWidget extends ReactWidget {
  private readonly filePath: string;

  public constructor(filePath: string) {
    super();
    this.addClass('jp-ReactWidget');
    this.filePath = filePath;
    this.title.icon = h5webIcon;
  }

  public render() {
    return <H5WebApp filePath={this.filePath} />;
  }
}
