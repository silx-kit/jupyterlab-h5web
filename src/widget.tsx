import React from 'react';
import {
  ABCWidgetFactory,
  Context,
  DocumentWidget,
} from '@jupyterlab/docregistry';
import { ReactWidget } from '@jupyterlab/apputils';
import { h5webIcon } from './icons';
import H5webApp from './H5webApp';

class H5webWidget extends ReactWidget {
  private readonly filePath: string;

  public constructor(filePath: string) {
    super();
    this.addClass('jp-ReactWidget');
    this.filePath = filePath;
    this.title.icon = h5webIcon;
  }

  public render(): JSX.Element {
    return <H5webApp filePath={this.filePath} />;
  }
}

class H5webWidgetFactory extends ABCWidgetFactory<DocumentWidget> {
  protected createNewWidget(context: Context): DocumentWidget {
    const { path } = context;
    const content = new H5webWidget(path);
    return new DocumentWidget({ context, content });
  }
}

export default H5webWidgetFactory;
