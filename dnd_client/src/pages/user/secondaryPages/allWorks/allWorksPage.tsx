import React from 'react';
import useSWR from 'swr';
import { RoutesAppApi } from '../../../../config';
import { AxiosAuth } from '../../../../core';
import { ApiSchemaAllFolders } from '../../../../models';
import { PageAllWorksAllDesign } from './allDesignPage';
import { PageAllWorksDefault } from './defaultPage';

export enum EnumAllWorkViews {
  Default = 'all_work_default',
  AllMyDesigns = 'all_work_all_my_designs',
  // Likes = 'all_work_likes',
  // SharedWithMe = 'all_work_shared_with_me',
  // Uploads = 'all_work_uploads',
}

export type PageAllWorksContextProps = {
  setView: (view: EnumAllWorkViews) => void;
  apiAllWorksData?: ApiSchemaAllFolders;
}

export function PageAllWorks() {
  const [view, setView] = React.useState<EnumAllWorkViews>(EnumAllWorkViews.Default);
  const { data: apiAllWorksData } = useSWR<ApiSchemaAllFolders>(
    RoutesAppApi.Folder.All(),
    () => AxiosAuth.get(RoutesAppApi.Folder.All()).then(r => r.data),
  );

  return (
    <div>
      <div className="container-fluid">
        <div>
          <div className="gry-bg custom-shadow site-main-content-body md-border-radious">
            <div>
              <div className="row">
                <div className="col-12">
                  <div className="px-4 pt-4 d-flex">
                    <div className="d-flex site-border-bottom w-100 pb-2">
                    <h2 className="mb-0 font-weight-bold blue-text">All my works</h2>
                   
                      {view === EnumAllWorkViews.Default && (
                        <div className="d-flex">
                          {/* <a className="site-primary-btn px-3 py-2 text-center align-items-center" href="javascript:void(0)" data-toggle="modal" data-target="#add-new-folder-modal"> Add new folder</a> */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="site-content-without-headding p-4">
              {view === EnumAllWorkViews.Default ? <PageAllWorksDefault setView={setView} apiAllWorksData={apiAllWorksData} />
                : view === EnumAllWorkViews.AllMyDesigns ? <PageAllWorksAllDesign setView={setView} apiAllWorksData={apiAllWorksData} />
                  : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}