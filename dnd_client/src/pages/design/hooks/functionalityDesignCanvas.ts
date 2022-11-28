import React from 'react';
import { fabric } from 'fabric';
import { useHistory } from 'react-router-dom';
import { FabricStateContext } from '..';
import { RoutesAppUi, RoutesAppApi } from '../../../config';
import { ActionsDesign, AxiosAuth, DragAndDropAppDispatch } from '../../../core';
import { ApiSchemaDesignData, TypeDesignConfigData } from '../../../models';
import axios, { AxiosResponse, Canceler } from 'axios';
import { batch, useDispatch } from 'react-redux';
import { DesignConfigDataMigration } from '../../../libs';
import { UtilsFabric } from '../../../utils';

export function useFunctionalityDesignCanvas() {
  const dispatch: DragAndDropAppDispatch = useDispatch();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const boundingRef = React.useRef<HTMLDivElement>(null);
  const fabricRef = React.useRef(false);
  const [isBusy, setIsBusy] = React.useState<boolean>(false);
  const routeParam = RoutesAppUi.Design.WithTemplate.useParam();
  const routeHistory = useHistory();

  const fabricState = React.useContext(FabricStateContext);

  React.useEffect(() => {
    let desingData: ApiSchemaDesignData;
    let designConfig: TypeDesignConfigData;
    let prevDesignConfig: TypeDesignConfigData | undefined;
    let cancelToken: Canceler | undefined;
    const onError = () => routeHistory.push(RoutesAppUi.PageNotFount.Root);

    const getThumbnailFromCanvas = (fabricCanvas: any) => {
      const dataURLtoBlob = (dataurl: any): Blob => {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      }

      let multiPlier = 1;
      let fabricCanvasHeight = fabricCanvas.height;
      let fabricCanvasWidth = fabricCanvas.width;
      if(fabricCanvasHeight >= 300 || fabricCanvasWidth >= 300) {
        if(fabricCanvasHeight > fabricCanvasWidth){
          multiPlier = 300/fabricCanvasHeight;
        } else {
          multiPlier = 300/fabricCanvasWidth;
        }
      }

      let imgData = fabricCanvas?.toDataURL({
        format: 'png', 
        quality: 1,
        multiplier: multiPlier
      });

      let blob = dataURLtoBlob(imgData);
      return blob;
    }

    const onSave = (fabricCanvas: any) => {
      let timeoutId: number;
      return (designConfig: TypeDesignConfigData) => {
        if (!UtilsFabric.IsDesignConfigSame(designConfig, prevDesignConfig)) {
          prevDesignConfig = designConfig;
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            dispatch(ActionsDesign.SetIsUploadingDesign(true));
            let thumbnailBlob = getThumbnailFromCanvas(fabricCanvas)
            const newDesignData: ApiSchemaDesignData = { ...desingData, config: JSON.stringify(designConfig), thumbnail: thumbnailBlob };
            cancelToken?.();

            function readProp(obj: any, prop:string) {
                return obj[prop];
            } 
            const body = new FormData();
            for ( var key in newDesignData ) {
              const value = readProp(newDesignData, key)
              body.append(key, value===null ? '' : value);
            }
            
            AxiosAuth.put(
              RoutesAppApi.Design.UpdateWithThumbnail(),
              body,
              { cancelToken: new axios.CancelToken(c => cancelToken = c) },
            ).then((r) => {
              dispatch(ActionsDesign.SetIsUploadingDesign(false));
              console.log('calling done', r.data)
            }
            ).catch(() =>
              dispatch(ActionsDesign.SetIsUploadingDesign(false))
            );
          }, 500) as unknown as number;
        }
      }
    }
    const loadFabric = async () => {
      if (!fabricRef.current && !!canvasRef.current && !!containerRef.current && !!boundingRef.current) {
        setIsBusy(true);
        if (routeParam === undefined) {
          onError();
          return;
        };
        let desingDataResponse: AxiosResponse<ApiSchemaDesignData>;
        try {
          desingDataResponse = await AxiosAuth.get<ApiSchemaDesignData>(
            RoutesAppApi.Design.ById(routeParam),
          );
        } catch (e) {
          onError();
          return;
        }
        setIsBusy(false);
        desingData = desingDataResponse.data;
        if (desingDataResponse.status !== 200 && !desingDataResponse.data) {
          onError();
          return;
        }
        designConfig = DesignConfigDataMigration(JSON.parse(desingDataResponse.data.config));
        prevDesignConfig = designConfig;
        let width = containerRef.current.clientWidth;
        let height = Math.round((width / designConfig.width) * designConfig.height);
        if (height > boundingRef.current.clientHeight) {
          height = boundingRef.current.clientHeight - 100;
          width = Math.round((height / designConfig.height) * designConfig.width);
        }
        const fabricCanvas = new fabric.Canvas(canvasRef.current, { width, height });
        fabricState.SetFabricInstance(
          fabricCanvas,
          {
            designId: routeParam,
            configData: designConfig,
          },
          onSave(fabricCanvas),
        );
        batch(() => {
          dispatch(ActionsDesign.SetCurrentDesignConfig(designConfig));
          dispatch(ActionsDesign.SetDesignName(desingData.name));
          if (!!desingData.subCategoryId) {
            dispatch(ActionsDesign.SetDesignSubcategory(String(desingData.subCategoryId)));
          }
        });
        fabricRef.current = true;
      }
    }
    loadFabric().catch(onError);
    return () => {
      fabricRef.current = false;
    }
    // eslint-disable-next-line
  }, []);

  return {
    isBusy,
    containerRef,
    boundingRef,
    canvasRef,
  };
}