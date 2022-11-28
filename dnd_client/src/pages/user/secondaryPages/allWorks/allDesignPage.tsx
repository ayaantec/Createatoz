import React from 'react';
import { EnumAllWorkViews, PageAllWorksContextProps } from './allWorksPage';
import { DesignPreview } from './designPreview';

export function PageAllWorksAllDesign(props: PageAllWorksContextProps) {
  console.log(props.apiAllWorksData);

  return (
    <>
      <div>
        <div className="row border-bottom">
          <div className="px-3 pb-3 d-flex">
            <a className="cur-point" onClick={() => props.setView(EnumAllWorkViews.Default)}>
              <p className="mb-0 blue-text mr-2">All My Works</p>
            </a>
            <p className="mb-0 mr-2">&gt;</p>
            <a>
              <p className="mb-0 blue-text mr-2 font-weight-bold"> All My Designs </p>
            </a>
          </div>
        </div>
      </div>

      <div>
        <div className="row pt-3">
          {
            props.apiAllWorksData?.designs?.map(design => (
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
                <a href="javascript:void(0)">
                  <DesignPreview design={design} />
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}