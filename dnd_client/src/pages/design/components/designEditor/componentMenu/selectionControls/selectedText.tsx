import React from "react";
import { SketchPicker } from "react-color";
import { shallowEqual } from "react-redux";
import { AssetsSvg } from "../../../../../../assets";
import { ApiHooks, useSelectorTyped } from "../../../../../../core";
import { FabricElementTypes } from "../../../../../../models";
import { FabricStateContext } from "../../../../designPage";
import { SelectedTextEffect } from "./selectedTextEffect";

export function SelectionMenuText(): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);
  const { data: apiFontData } = ApiHooks.Admin.Fonts.GetAllFonts.useHook();
  const fabricObjectSelection = useSelectorTyped(state => state.fabricData.selection, shallowEqual);
  const textData = fabricObjectSelection?.type === FabricElementTypes.IText ? fabricObjectSelection.data : undefined;
  const [colorType, setColorType] = React.useState<'b' | 'c' | undefined>();
  const [color, setColor] = React.useState<string>('#FFFFFF');

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
              <div className="py-3">
                <AssetsSvg.InsertText />
              </div>
              <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                Text
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
              className="collapse show design-scrollable-item"
              aria-labelledby="headingThree"
              data-parent="#accordion"
            >
              <div className="image-creation-elements-expanded">
                <div className="site-border-botom px-3">
                  <form>
                    <div className="form-group my-3">
                      <select name="fontfamily" value={fabricState.fontData} id="selectFontFamily" className="form-control" onChange={(e) => fabricState.ControlFontText?.SelectionTextFamily(e.target.value)}>
                        {apiFontData?.map(font => <option key={font.id} value={font.id}> {font.displayName} </option>)}
                      </select>
                    </div>
                  </form>
                </div>

                <div className="site-border-botom px-3 d-flex" >
                  <form>
                    <div className="form-group my-3">
                      <select className="form-control" onChange={(e) => fabricState.SelectionTextSize(e.target.value)}>
                        <option>12</option>
                        <option>14</option>
                        <option>16</option>
                        <option>18</option>
                        <option>20</option>
                      </select>
                    </div>
                  </form>
                </div>

                <div className="site-border-botom px-3 py-2 d-flex">
                  <div
                    className="edit-elements-single-icon p-1 site-border-radious-sm mr-2"
                    onClick={() => fabricState.SelectionTextBold()}
                  >
                    <AssetsSvg.Bold />
                  </div>

                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2"
                    onClick={() => fabricState.SelectionTextItalic()}
                  >
                    <AssetsSvg.Italic />
                  </div>

                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2"
                    onClick={() => fabricState.SelectionTextUnderline()}
                  >
                    <AssetsSvg.Underline />
                  </div>

                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                    <label className="cur-point" onClick={() => setColorType(s => s !== 'c' ? 'c' : undefined)}> <AssetsSvg.TextColor /></label>

                  </div>

                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                    <label className="cur-point" onClick={() => setColorType(s => s !== 'b' ? 'b' : undefined)}><AssetsSvg.TextBgColor /></label>
                  </div>
                </div>
                {colorType !== undefined && (
                  <div className="site-border-botom">
                    <SketchPicker
                      className="w-100"
                      color={color}
                      onChange={c => setColor(c.hex)}
                      onChangeComplete={c => {
                        if (colorType === 'b') {
                          fabricState.SelectionTextBackgroungColor(c.hex);
                        } else if (colorType === 'c') {
                          fabricState.SelectionTextColor(c.hex);
                        }
                      }}
                    />
                  </div>
                )}

                <div className="site-border-botom px-3 py-2 d-flex">
                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2"
                    onClick={() => fabricState.TextAlign("left")}
                  >
                    <AssetsSvg.AlignLeft />
                  </div>

                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2"
                    onClick={() => fabricState.TextAlign("center")}>
                    <AssetsSvg.AlignMiddle />
                  </div>

                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2"
                    onClick={() => fabricState.TextAlign("right")}>
                    <AssetsSvg.AlignRight />
                  </div>

                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2"
                    onClick={() => fabricState.TextAlign("justify")}>
                    <AssetsSvg.AlignSame />
                  </div>
                </div>

                <div className="site-border-botom px-3 py-2 d-flex">
                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2"
                    onClick={() => fabricState.SelectionTexttoUpper()}>
                    <AssetsSvg.TextSize />
                  </div>

                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2"
                    onClick={() => fabricState.getBulletPoints()}
                  >
                    <AssetsSvg.BulletPoints />
                  </div>

                  <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2"
                    onClick={() => fabricState.getNumberPoints()}
                  >
                    <AssetsSvg.NumberPoints />
                  </div>

                  <div
                    className="edit-elements-single-icon p-1 site-border-radious-sm mr-2 collapsed"
                    data-toggle="collapse"
                    data-target="#collapseLineHeight"
                    aria-expanded="false"
                    aria-controls="collapseLineHeight"
                  >
                    <AssetsSvg.LineHeight />
                  </div>
                </div>

                <div
                  id="collapseLineHeight"
                  className="collapse site-border-botom p-3"
                  aria-labelledby="collapseLineHeight"
                  data-parent="#accordion"
                >
                  <div className="item-slider-control my-2 w-100">
                    <p className="mr-2 my-auto">Character Spacing</p>
                    <input type="range" min="0" max="500" value={textData?.charSpacing} className="slider my-auto mr-2 flex-grow-1" id="charSpacing" step="5" onChange={(e) => fabricState.SelectionTextCharSpacing(e.target.value)} />
                    <input type="text" className="my-auto number-field" id="charSpacingView" value={textData?.charSpacing} />
                  </div>

                  <div className="w-100 item-slider-control my-2">
                    <p className="mr-2 my-auto">Line Spacing</p>
                    <input type="range" min="1" max="3" className="slider my-auto mr-2 flex-grow-1" id="lineHeight" step="0.5" onChange={(e) => fabricState.SelectionTextLineheight(e.target.value)} />
                    <input type="text" className="my-auto number-field" id="lineSpacingView" value={textData?.lineHeight} />
                  </div>
                </div>
                <SelectedTextEffect />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
