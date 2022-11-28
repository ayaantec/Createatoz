import React from 'react';
import { fabric } from 'fabric';
import { ApiSchemaDesignData, TypeDesignConfigData } from '../../../../models';
import { FabricControlImport } from '../../../../libs/controls';
import { Spinner } from '../../../../common';
import { GetFullUrl } from '../../../../utils';
import { RoutesAppUi } from '../../../../config';

const MaxPreviewSize = 150;

type Props = {
  design: ApiSchemaDesignData;
}

export function DesignPreview(props: Props): JSX.Element {
  const imgRef = React.useRef<string>();
  const imgHeight = React.useRef<number>(MaxPreviewSize);
  const imgWidth = React.useRef<number>(MaxPreviewSize);
  const [isBusy, setIsBusy] = React.useState<boolean>(false);

  React.useEffect(() => {
    try {
      const config: TypeDesignConfigData = JSON.parse(props.design.config);
      const canvas = window.document.createElement('canvas');
      let height = MaxPreviewSize;
      let width = MaxPreviewSize;
      let zoomScale: number = 1;
      if (config.clientHeight && config.clientWidth) {
        if (config.clientHeight > config.clientWidth) {
          width = Math.round((height / config.height) * config.width);
        } else {
          height = Math.round((width / config.width) * config.height);;
        }
        imgWidth.current = width;
        imgHeight.current = height;
        zoomScale = width / config.clientWidth;
      }
      canvas.height = height;
      canvas.width = width;
      const fabricCanvas = new fabric.Canvas(canvas, { width, height });
      fabricCanvas.setZoom(zoomScale);
      const controlImport = new FabricControlImport(
        fabricCanvas,
        {
          onStart: () => setIsBusy(true),
          onEnd: () => {
            imgRef.current = fabricCanvas.toDataURL();
            setIsBusy(false);
          },
        }
      );
      if (config.fabricData) {
        controlImport.LoadFromJson(config.fabricData);
      }
    } catch (e) {
      console.error(e);
    };
  }, [props.design.config]);

  return (
    <div
      style={{ width: `${MaxPreviewSize}px`, height: `${MaxPreviewSize}px` }}
      className="folder-ctl d-flex justify-content-center align-items-center"
      onClick={() => window.open(GetFullUrl(RoutesAppUi.Design.WithTemplate.Load(props.design.id)))}>
      {isBusy ? <Spinner /> : (
        <img
          style={{ width: `${imgWidth.current}px`, height: `${imgHeight.current}px` }}
          src={imgRef.current}
          alt="design-preview"
        />
      )}
    </div>
  );
}