import React from 'react';
import { shallowEqual } from 'react-redux';
import { AssetsSvg } from '../../../assets';
import { Spinner } from '../../../common';
import { useSelectorTyped } from '../../../core';
import { FabricStateContext } from '../designPage';
import { DesignDownload } from './designDownload';

function DesignOutputControlComponent(): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);
  const store = useSelectorTyped(state => ({
    canZoomIn: !!state.fabricData.canZoomIn,
    canZoomOut: !!state.fabricData.canZoomOut,
    isPanMode: !!state.fabricData.isPanMode,
    isUploadingDesign: !!state.design.isUploadingDesign,
    isWorking: state.fabricData.isWorking,
    designName: state.design.currentDesignName,
    designHeight: state.design.currentDesignConfig?.height,
    designWidth: state.design.currentDesignConfig?.width,
  }), shallowEqual);
  return (
    <div>
      <div className="image-creation-export-ctl">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 my-auto">
              <div className="d-flex align-items-center">
                <p className="my-2 ml-xl-0 ml-lg-0 ml-md-auto ml-sm-auto ml-auto mr-2 headding-text">
                  <span> {store.designName} </span>
                </p>
                <p className="my-2 mr-xl-0 mr-lg-0 mr-md-auto mr-sm-auto mr-auto ml-2 info-text ">
                  <span> {store.designWidth}x{store.designHeight} </span>
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-center">
              <div className="site-border-right d-flex px-xl-2 px-lg-2 px-md-2 px-sm-0 px-0 ml-auto d-none">
                {/* eslint-disable-next-line */}
                {/* <a href="javascript:void(0)">
                  <div className="p-2 ctl-icons">
                    <AssetsSvg.Undo />
                  </div>
                </a> */}
                {/* eslint-disable-next-line */}
                {/* <a href="javascript:void(0)">
                  <div className="p-2 ctl-icons">
                    <AssetsSvg.Redo />
                  </div>
                </a> */}
              </div>
              <div className="site-border-right d-flex">
                {/* <div className="p-2 ctl-icons cur-point" onClick={() =>fabricState.ClearCanvas() }>
                  <AssetsSvg.DeleteIcon />
                </div> */}
                <div className="p-2 ctl-icons cur-point" onClick={() => fabricState.ClearCanvas()}>
                  <AssetsSvg.Reset />
                </div>
                <div className={`p-2 ctl-icons cur-point${store.canZoomIn ? '' : ' opct-50'}`} onClick={() => fabricState.ControlZoom?.ZoomIn()}>
                  <AssetsSvg.ZoomIn />
                </div>
                <div className={`p-2 ctl-icons cur-point${store.canZoomOut ? '' : ' opct-50'}`} onClick={() => fabricState.ControlZoom?.ZoomOut()}>
                  <AssetsSvg.ZoomOut />
                </div>
                <div className={`p-2 ctl-icons cur-point${store.isPanMode ? ' bg-Gray' : ''}`} onClick={() => fabricState.PanModeToggle()}>
                  <AssetsSvg.PanTool />
                </div>
                <div className="p-2 ctl-icons cur-point" onClick={() => fabricState.DeselectAll()}>
                  <AssetsSvg.AllOut />
                </div>
              </div>
              <div className="d-flex">
                {/* eslint-disable-next-line */}
                {/* <a href="javascript:void(0)">
                  <div className="p-2 ctl-icons d-flex">
                    <div>
                      <AssetsSvg.PlayMedia />
                    </div>
                    <p className="my-auto ml-2">24.03 sec</p>
                  </div>
                </a> */}
              </div>
              <DesignDownload />
              <div className="d-flex">
              </div>
              <div className={`${store.isUploadingDesign || store.isWorking ? '' : 'invisible '}d-flex px-xl-2 px-lg-2 px-md-2 px-sm-0 px-0 mr-auto align-items-center`}>
                <Spinner /> Updating...
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12  d-xl-block d-lg-block d-md-block d-sm-none d-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const DesignOutputControl = React.memo(DesignOutputControlComponent);