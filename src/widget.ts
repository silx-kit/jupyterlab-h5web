import {
  ABCWidgetFactory,
  Context,
  DocumentRegistry,
  DocumentWidget
} from '@jupyterlab/docregistry';
import H5webApp from './H5webApp';

class H5webWidgetFactory extends ABCWidgetFactory<
  DocumentWidget,
  DocumentRegistry.IModel
> {
  protected createNewWidget(context: Context): DocumentWidget {
    const { path } = context;
    const content = new H5webApp(path);
    return new DocumentWidget({ context, content });
  }
}

export default H5webWidgetFactory;
