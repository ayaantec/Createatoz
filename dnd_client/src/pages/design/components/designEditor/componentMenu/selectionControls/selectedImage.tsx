import React from 'react';
import { shallowEqual } from 'react-redux';
import { AssetsSvg } from "../../../../../../assets";
import { useSelectorTyped } from '../../../../../../core';
import { FabricElementTypes } from '../../../../../../models';
import { FabricStateContext } from '../../../../designPage';

export function SelectionMenuImage(): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);

  const fabricObjectSelection = useSelectorTyped(state => state.fabricData.selection, shallowEqual);
  const imageData = fabricObjectSelection?.type === FabricElementTypes.Image ? fabricObjectSelection.data : undefined;

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
          <div className="image-creation-elements">
            <div className="d-flex" id="headingThree" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              <div className="collapsed p-3 m-auto">
                <AssetsSvg.InsertImage />
              </div>
              <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Image</p>
              <span className="collapsed collapsed-custom p-3 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                <AssetsSvg.DownArrow />
              </span>
            </div>
            <div id="collapseOne" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
              <div className="image-creation-elements-expanded">
                {/* <div className="site-border-botom px-3 py-2">
                  <a href="javascript:void(0)">
                    <p className="site-upload-btn p-2 mb-0">Replace Image</p>
                  </a>
                </div> */}
                {/* <div className="site-border-botom px-3">
                  <div id="accordion">
                    <div>
                      <div id="transition" className="cur-point" data-toggle="collapse" data-target="#transitioncollaps" aria-expanded="false" aria-controls="transitioncollaps">
                        <div className="d-flex" id="headingThree" data-toggle="collapse" data-target="#transitioncollaps" aria-expanded="false" aria-controls="transitioncollaps">
                          <div className="collapsed p-3 m-auto">
                            <AssetsSvg.Transition />
                          </div>
                          <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Transition</p>
                          <span className="collapsed collapsed-custom py-3 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                            <AssetsSvg.DownArrow />
                          </span>
                        </div>
                      </div>
                      <div id="transitioncollaps" className="collapse" aria-labelledby="transition" data-parent="#accordion">
                        <div className="trnsition-items">
                          <div className="mt-1 trnsition-items">
                            <div className="px-3">
                              <div className="row">
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">None</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Block</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Breath</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Fade</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Pan</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Rise</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Tumble</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Drift</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Stomp</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Tectonic</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Baseline</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Pop</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Neon</p>
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="trnsition-items-single">
                                    <p className="text-center p-3 mb-0">Scrapbook</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className=" px-3">
                  <div id="accordion">
                    <div>
                      <div id="positon" className="cur-point" data-toggle="collapse" data-target="#positoncollaps" aria-expanded="true" aria-controls="transitioncollaps">
                        <div className="d-flex" id="headingFour">
                          <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Positon</p>
                          <span className="collapsed collapsed-custom py-3 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                            <AssetsSvg.DownArrow />
                          </span>
                        </div>
                      </div>
                      <div id="positoncollaps" className="collapse show" aria-labelledby="positon" data-parent="#accordion">
                        <div className="py-2 d-flex site-border-top">
                          <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2 cur-point" onClick={() => fabricState.ControlSelectionImage?.SelectionImageRotateCCW45()}>
                            <AssetsSvg.Rotation />
                          </div>
                          <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2 cur-point" onClick={() => fabricState.ControlSelectionImage?.SelectionImageRotateCW90()}>
                            <AssetsSvg.RotateRight />
                          </div>
                          <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2 cur-point" onClick={() => fabricState.ControlSelectionImage?.SelectionImageRotateCCW90()}>
                            <AssetsSvg.RotateLeft />
                          </div>
                          <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2 cur-point" onClick={() => fabricState.ControlSelectionImage?.SelectionImageRotate180()}>
                            <AssetsSvg.RotateFull />
                          </div>
                          <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2 cur-point" onClick={() => fabricState.ControlSelectionImage?.SelectionImageFlip()}>
                            <AssetsSvg.Flip />
                          </div>
                        </div>
                        <div className="py-2 d-flex site-border-top">
                          <div className={`${imageData?.isLocked ? 'bg-Gray ' : ''}edit-elements-single-icon p-1 site-border-radious-sm mr-2 cur-point`} onClick={() => fabricState.SelectionImageLockToggle()}>
                            <AssetsSvg.Lock />
                          </div>
                          <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2 cur-point" onClick={() => fabricState.ControlSelectionImage?.SelectionImageClone()}>
                            <AssetsSvg.Copy />
                          </div>
                          <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2 cur-point" onClick={() => fabricState.ControlSelectionImage?.SelectionImageDelete()}>
                            <AssetsSvg.DeleteIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}