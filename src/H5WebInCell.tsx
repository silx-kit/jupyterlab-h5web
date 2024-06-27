import React from 'react';
import H5webApp from './H5webApp';
import { useMeasure } from '@react-hookz/web';

interface Props {
  path: string;
}

function H5WebInCell(props: Props) {
  const { path } = props;

  // Wait for cell to have non-empty size so H5Web can render safely
  const [rect, cellRef] = useMeasure<HTMLDivElement>();

  return (
    <div ref={cellRef} className="h5web-in-cell">
      {rect && rect.width > 0 && <H5webApp filePath={path} />}
    </div>
  );
}

export default H5WebInCell;
