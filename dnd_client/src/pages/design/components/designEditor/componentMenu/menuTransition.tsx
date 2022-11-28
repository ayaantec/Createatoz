import React from 'react';
import { AssetsSvg } from '../../../../../assets';

export function MenuTransitions(): JSX.Element {
  return(
    <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
      <div className="image-creation-elements">
        <div className="d-flex" id="headingThree" data-toggle="collapse" data-target="#headingFour" aria-expanded="false" aria-controls="headingFour">
          <div className="p-3 m-auto">
            <AssetsSvg.Transition />
          </div>
          <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Transition</p>
          <span className="collapsed collapsed-custom p-3 d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <AssetsSvg.DownArrow />
          </span>
        </div>
        <div id="headingFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
          <div className="p-3 image-creation-elements-expanded">
            <div className="trnsition-items">
              <div className="mt-1 trnsition-items">
                <div className="px-3">
                  <div className="row">
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)"><p className="text-center p-3 mb-0">None</p></a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)"><p className="text-center p-3 mb-0">Block</p></a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)"><p className="text-center p-3 mb-0">Breath</p></a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)"><p className="text-center p-3 mb-0">Fade</p></a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)"><p className="text-center p-3 mb-0">Pan</p></a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)"><p className="text-center p-3 mb-0">Rise</p></a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)"><p className="text-center p-3 mb-0">Tumble</p></a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)">
                          <span className="trnsition-items-single-paid-icon">
                            <AssetsSvg.PaidContentIcon />
                          </span>
                          <p className="text-center p-3 mb-0">Drift</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)">
                          <span className="trnsition-items-single-paid-icon">
                            <AssetsSvg.PaidContentIcon />
                          </span>
                          <p className="text-center p-3 mb-0">Stomp</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)">
                          <span className="trnsition-items-single-paid-icon">
                            <AssetsSvg.PaidContentIcon />
                          </span>
                          <p className="text-center p-3 mb-0">Tectonic</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)">
                          <span className="trnsition-items-single-paid-icon">
                            <AssetsSvg.PaidContentIcon />
                          </span>
                          <p className="text-center p-3 mb-0">Baseline</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)">
                          <span className="trnsition-items-single-paid-icon">
                            <AssetsSvg.PaidContentIcon />
                          </span>
                          <p className="text-center p-3 mb-0">Pop</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)">
                          <span className="trnsition-items-single-paid-icon">
                            <AssetsSvg.PaidContentIcon />
                          </span>
                          <p className="text-center p-3 mb-0">Neon</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="trnsition-items-single">
                        {/* eslint-disable-next-line */}
                        <a href="javascript:void(0)">
                          <span className="trnsition-items-single-paid-icon">
                            <AssetsSvg.PaidContentIcon />
                          </span>
                          <p className="text-center p-3 mb-0">Scrapbook</p>
                        </a>
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
  )
}