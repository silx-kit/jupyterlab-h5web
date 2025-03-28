import {
  ABCWidgetFactory,
  type Context,
  DocumentWidget,
} from '@jupyterlab/docregistry';

import { H5WebWidget } from './H5WebWidget';

class H5WebWidgetFactory extends ABCWidgetFactory<DocumentWidget> {
  protected createNewWidget(context: Context): DocumentWidget {
    const { path } = context;
    const content = new H5WebWidget(path);
    return new DocumentWidget({ context, content });
  }
}

export default H5WebWidgetFactory;
