import React from 'react';
import { AssetsSvg } from '../../../../../../assets';
import { FabricStateContext } from "../../../../designPage";
import { FabricElementTypes } from '../../../../../../models';
import { shallowEqual } from 'react-redux';
import { useSelectorTyped } from '../../../../../../core';
import { SketchPicker } from 'react-color';


export function SelectionMenuElement(): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);
  const groupData = useSelectorTyped(state => state.fabricData.selection?.type === FabricElementTypes.Group ? ({
    colors: state.fabricData.selection.data?.colors ?? [],
  }) : undefined, shallowEqual);
  const isElementSelected = useSelectorTyped(state => state.fabricData.selection?.type === FabricElementTypes.Circle
    || state.fabricData.selection?.type === FabricElementTypes.Rectangle
    || state.fabricData.selection?.type === FabricElementTypes.Path
  );

  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>();
  const [color, setColor] = React.useState('#FFFFFF');
  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
          <div className="image-creation-elements">
            <div className="d-flex" id="headingThree">
              <div
                className="collapsed p-3 m-auto d-none"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <AssetsSvg.Back />
              </div>
              <div className="p-3">

                <AssetsSvg.Elementsvg />
              </div>
              <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                Elements
              </p>
              <span
                className="collapsed collapsed-custom p-3 d-xl-block d-lg-block d-md-block d-sm-none d-none"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <AssetsSvg.DownArrow />
              </span>
            </div>
            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingThree"
              data-parent="#accordion"
            >
              {isElementSelected ? (
                <div className="image-creation-elements-expanded">
                  <div className="site-border-botom px-3 py-2 flex-wrap align-content-start d-flex">
                    <SketchPicker
                      className="w-100"
                      color={color}
                      onChange={c => setColor(c.hex)}
                      onChangeComplete={c => fabricState.SelectionElementFill(c.hex)}
                    />
                  </div>
                </div>
              ) : (
                  <div className="image-creation-elements-expanded">
                    <div className="site-border-botom px-3 py-2 flex-wrap align-content-start d-flex">
                      {groupData?.colors.map((color, index) => (
                        <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                          <label className="p-3 border cur-point" style={{ background: color }} onClick={() => setSelectedIndex(s => s !== index ? index : undefined)}></label>
                        </div>
                      ))}
                    </div>
                    {selectedIndex !== undefined && (
                      <div className="site-border-botom px-3 py-2 flex-wrap align-content-start d-flex">
                        <SketchPicker
                          className="w-100"
                          color={color}
                          onChange={c => setColor(c.hex)}
                          onChangeComplete={c => fabricState.SelectionGroupFillColor(selectedIndex, c.hex)}
                        />
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}