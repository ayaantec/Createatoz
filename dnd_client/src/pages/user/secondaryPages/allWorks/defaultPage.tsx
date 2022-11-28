import React from 'react';
import { AssetsSvg } from '../../../../assets';
import { EnumAllWorkViews, PageAllWorksContextProps } from './allWorksPage';

export function PageAllWorksDefault(props: PageAllWorksContextProps) {
  return (
    <>
      <div>
        <div className="row">
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
            <a href="javascript:void(0)" onClick={() => props.setView(EnumAllWorkViews.AllMyDesigns)}>
              <div className="folder-ctl px-3 py-3">
                <div className="d-flex">
                  <div>
                    <AssetsSvg.ColorfulFolder />
                  </div>
                  <p className="mb-0 ml-2">All my designs</p>
                </div>
              </div>
            </a>
          </div>
          {/* 
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
            <a href="javascript:void(0)">
              <div className="folder-ctl px-3 py-3">
                <div className="d-flex">
                  <div>
                    <AssetsSvg.Like />
                  </div>
                  <p className="mb-0 ml-2">Likes</p>
                </div>
              </div>
            </a>
          </div> */}

          {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
            <a href="javascript:void(0)" onClick={() => props.setView(EnumAllWorkViews.AllMyDesigns)}>
              <div className="folder-ctl px-3 py-3">
                <div className="d-flex">
                  <div>
                    <AssetsSvg.AllDesign />
                  </div>
                  <p className="mb-0 ml-2">All my designs</p>
                </div>
              </div>
            </a>
          </div> */}

          {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
            <a href="javascript:void(0)">
              <div className="folder-ctl px-3 py-3">
                <div className="d-flex">
                  <div>
                    <AssetsSvg.Shared />
                  </div>
                  <p className="mb-0 ml-2">Shared with me</p>
                </div>
              </div>
            </a>
          </div> */}

          {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
            <a href="javascript:void(0)">
              <div className="folder-ctl px-3 py-3">
                <div className="d-flex">
                  <div>
                    <AssetsSvg.Upload />
                  </div>
                  <p className="mb-0 ml-2">Upload</p>
                </div>
              </div>
            </a>
          </div> */}
        </div>
      </div>

      {/* <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-2">
            <div>
              <p className="mb-0 gry-text">Other Folders</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
            <a href="javascript:void(0)">
              <div className="folder-ctl px-3 py-3">
                <div className="d-flex">
                  <AssetsSvg.Folder />
                  <p className="mb-0 ml-2 flex-grow-1">Folder</p>

                  <span>
                    <AssetsSvg.Option />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div> */}
    </>
  );
}