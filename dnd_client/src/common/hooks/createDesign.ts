import React from 'react';
import { RoutesAppApi, RoutesAppUi } from '../../config';
import { AxiosAuth } from '../../core';
import { ApiSchemaSubcatagoryData, TypeDesignConfigData } from '../../models';
import { GetFullUrl } from '../../utils';

type CreateDesigeBody = {
  config: string;
  name: string;
  subCategoryId?: number;
  folderId: null;
}

type CreateDesigeResopnse = {
  id: number;
  userId: number;
  subCategoryId: number;
  subCategory: ApiSchemaSubcatagoryData;
  dateCreated: string;
  dateUpdated: string;
  config?: string;
  name?: string;
}

type DesignCreationData = {
  width: number;
  height: number;
  subCategoryId?: string,
  templateUrl?: string,
  name?: string
}

export function useCreateUserDesign() {
  const [isBusy, setIsBusy] = React.useState<boolean>(false);
  const [isOpenWindow, setIsOpenWindow] = React.useState<boolean>(false);

  const createDesign = React.useCallback(async (data: DesignCreationData) => {
    setIsBusy(true);
    setIsOpenWindow(false)
    const designConfigData: TypeDesignConfigData = {
      version: 1,
      width: data.width,
      height: data.height,
      templateUrl: data.templateUrl,
    };

    const requestBody: CreateDesigeBody = {
      name: data.name || 'New Design',
      config: JSON.stringify(designConfigData),
      folderId: null
    };

    if (typeof data.subCategoryId === 'string') {
      requestBody['subCategoryId'] = Number(data.subCategoryId);
    }

    function readProp(obj: any, prop:string) {
        return obj[prop];
    } 
    const body = new FormData();
    for ( var key in requestBody ) {
      const value = readProp(requestBody, key)
      body.append(key, value===null ? '' : value);
    }
    
    AxiosAuth.post<CreateDesigeResopnse>(
      RoutesAppApi.Design.CreateWithThumbnail(),
      body,
    ).then(r => {
      if (r.status === 200) {
        window.open(GetFullUrl(RoutesAppUi.Design.WithTemplate.Load(r.data.id)));
      }
      setIsBusy(false);
      setIsOpenWindow(true)
    }).catch(() => {
      setIsBusy(false)
      setIsOpenWindow(true)
    });
  }, []);

  const createDesignWithTemplate = React.useCallback(
    (width: number, height: number, templateUrl: string, subCategoryId: string, name?: string) => createDesign({
      width,
      height,
      templateUrl,
      subCategoryId,
      name,
    }),
    [createDesign],
  );
  const createDesignWithoutTemplate = React.useCallback(
    (width: number, height: number, subCategoryId: string, name?: string) => createDesign({
      width,
      height,
      subCategoryId,
      name,
    }),
    [createDesign],
  );
  const createCustomDesign = React.useCallback(
    (width: number, height: number, name?: string) => createDesign({
      width,
      height,
      name,
    }),
    [createDesign],
  );

  return {
    isBusy,
    isOpenWindow,
    createDesignWithTemplate,
    createDesignWithoutTemplate,
    createCustomDesign,
  };
}