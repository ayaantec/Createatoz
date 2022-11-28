import React from 'react';
import { AssetsSvg } from '../../../../../../assets';
import { FabricStateContext } from "../../../../designPage";

export function SelectionMenuAny(): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);
  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
          <div className="image-creation-elements">
            <div className="d-flex" id="commonMenuObjectPosition">
              <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                Object Stacking
              </p>
              <span
                className="collapsed collapsed-custom p-3 d-xl-block d-lg-block d-md-block d-sm-none d-none"
                data-toggle="collapse"
                data-target="#commonMenuObjectPositioncollapse"
                aria-expanded="false"
                aria-controls="commonMenuObjectPositioncollapse"
              >
                <AssetsSvg.DownArrow />
              </span>
            </div>
            <div
              id="commonMenuObjectPositioncollapse"
              className="collapse show"
              aria-labelledby="commonMenuObjectPosition"
              data-parent="#accordion"
            >
              <div className="image-creation-elements-expanded">
                <div className="site-border-botom px-3 py-2 flex-wrap align-content-start d-flex">
                  {/* eslint-disable-next-line */}
                  <a className="site-primary-btn px-3 py-2 text-center mr-2" href="javascript:void(0)" onClick={() => fabricState.ControlObjectStacking?.BringSelectionForward()}>Bring Forward</a>
                  {/* eslint-disable-next-line */}
                  <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={() => fabricState.ControlObjectStacking?.BringSelectionToFront()}>Bring To Front</a>
                </div>
                <div className="site-border-botom px-3 py-2 flex-wrap align-content-start d-flex">
                  {/* eslint-disable-next-line */}
                  <a className="site-primary-btn px-3 py-2 text-center mr-2" href="javascript:void(0)" onClick={() => fabricState.ControlObjectStacking?.SendSelectionBackwards()}>Send Backwards</a>
                  {/* eslint-disable-next-line */}
                  <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={() => fabricState.ControlObjectStacking?.SendSelectionToBack()}>Send To Back</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}