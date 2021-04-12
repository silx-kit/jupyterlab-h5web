import { LabIcon } from '@jupyterlab/ui-components';
import hdf5IconSvg from '../style/hdf5-icon.svg';
import h5webIconSvg from '../style/h5web-icon.svg';

export const hdf5Icon = new LabIcon({
  name: 'hdf5-icon',
  svgstr: hdf5IconSvg,
});

export const h5webIcon = new LabIcon({
  name: 'h5web-icon',
  svgstr: h5webIconSvg,
});
