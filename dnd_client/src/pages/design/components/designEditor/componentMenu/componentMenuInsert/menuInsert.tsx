import React from 'react';
import { AssetsSvg } from '../../../../../../assets';
import { DesignEditorMenuScreen } from "../../imageEditor"

type Props = { setscreen: (scr: DesignEditorMenuScreen) => void };

export function MenuInsert(props: Props): JSX.Element {
  return (
    <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
      <div className="image-creation-elements">
        <div className="d-flex cur-point" id="headingThree" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          <div className="p-3 m-auto">
            <AssetsSvg.Insert />
          </div>
          <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Insert</p>
          <span className="collapsed collapsed-custom p-3 d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <AssetsSvg.DownArrow />
          </span>
        </div>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
          <div className="image-creation-elements-expanded">
            <div className="site-border-botom inset-single-item cur-point" onClick={() => props.setscreen("textProperties")}>
              <div className="d-flex">
                <div className="p-3 inset-single-arrow">
                  <AssetsSvg.RightArrow />
                </div>
                <div className="py-3">
                  <AssetsSvg.InsertText />
                </div>
                <p className="my-auto ml-2">Text</p>
              </div>
            </div>
            <div className="site-border-botom inset-single-item cur-point" onClick={() => props.setscreen("imageProperties")}>
              <div className="d-flex">
                <div className="p-3 inset-single-arrow">
                  <AssetsSvg.RightArrow />
                </div>
                <div className="py-3">
                  <AssetsSvg.InsertImage />
                </div>
                <p className="my-auto ml-2">Image</p>
              </div>
            </div>
            <div className="site-border-botom inset-single-item cur-point" onClick={() => props.setscreen("audioProperties")}>
              <div className="d-flex">
                <div className="p-3 inset-single-arrow">
                  <AssetsSvg.RightArrow />
                </div>
                <div className="py-3">
                  <AssetsSvg.InsertAudio />
                </div>
                <p className="my-auto ml-2">Audio</p>
              </div>
            </div>
            <div className="site-border-botom inset-single-item cur-point" onClick={() => props.setscreen("videoProperties")}>
              <div className="d-flex">
                <div className="p-3 inset-single-arrow">
                  <AssetsSvg.RightArrow />
                </div>
                <div className="py-3">
                  <AssetsSvg.InsertVideo />
                </div>
                <p className="my-auto ml-2">Video</p>
              </div>
            </div>
            <div className="inset-single-item cur-point" onClick={() => props.setscreen("elementProperties")}>
              <div className="d-flex">
                <div className="p-3 inset-single-arrow">
                  <AssetsSvg.RightArrow />
                </div>
                <div className="py-3">
                  <AssetsSvg.InsertElements />
                </div>
                <p className="my-auto ml-2">Elements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}