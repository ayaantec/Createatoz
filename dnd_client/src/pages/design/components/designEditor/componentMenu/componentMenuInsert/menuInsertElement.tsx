import React from "react";
import { FabricStateContext } from "../../../../designPage";
import { AssetsSvg } from "../../../../../../assets";
import { DesignEditorMenuScreen } from "../../imageEditor";
import { useFunctionalityElementsChoose } from "../../../../../admin";

type Props = { setscreen: (scr: DesignEditorMenuScreen) => void };

export function MenuInsertElement(props: Props): JSX.Element {
  const {
    elements
  } = useFunctionalityElementsChoose();
  const fabricState = React.useContext(FabricStateContext);

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
          <div className="image-creation-elements image-creation-elements-details">
            <div className="d-flex site-border-botom" id="headingThree">
              <div className="back-btn p-3">

                <AssetsSvg.Back
                  className="cur-point"
                  onClick={() => props.setscreen("defaultMenu")}
                />
              </div>

              <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                Insert Elements
              </p>
            </div>
            <div className="site-border-botom">
              <div id="accordion">
                <div>
                  <div id="transition">
                    <div className="d-flex cur-point" id="headingThree" data-toggle="collapse"
                      data-target="#shapecollaps"
                      aria-expanded="false"
                      aria-controls="shapecollaps">
                      <span className="collapsed collapsed-custom p-3 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        <AssetsSvg.RightArrow />
                      </span>
                      <div className="collapsed p-3 m-auto">
                        <AssetsSvg.ShapesIcon />
                      </div>
                      <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        Shapes
                      </p>
                    </div>
                  </div>
                  <div
                    id="shapecollaps"
                    className="collapse"
                    aria-labelledby="transition"
                    data-parent="#accordion"
                  >
                    <div>
                      <div className="mt-1 trnsition-items">
                        <div className="px-3">
                          <div className="row">
                            <div className="col-4 p-2">
                              <div className="trnsition-items-single d-flex justify-content-center cur-point" onClick={() => fabricState.AddCircle()}>
                                <div style={{ borderRadius: '50%', width: '5em', height: '5em' }} className="m-1 bg-dark" />
                              </div>
                            </div>
                            <div className="col-4 p-2">
                              <div className="trnsition-items-single d-flex justify-content-center cur-point" onClick={() => fabricState.AddRectangle()}>
                                <div style={{ width: '5em', height: '5em' }} className="m-1 bg-dark" />
                              </div>
                            </div>
                            <div>
                              <div className="flex-wrap align-content-start d-flex">
                                {elements.map(img => (
                                  <div key={img.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 pb-3">
                                    <div className="templets-view" onClick={() => fabricState.ControlImage?.LoadElement(img.imgUrlProxy || img.imgUrl)}>
                                      <img className="img-fluid img-cover " src={img.imgUrl} alt={img.displayName} />
                                    </div>
                                  </div>
                                ))}
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
            {/* <div className="site-border-botom">
              <div id="accordion">
                <div>
                  <div id="transition">
                    <div className="d-flex" id="headingThree" onClick={() => fabricState.ToggleDrawingMode()}>
                    <div className="d-flex" id="headingThree" data-toggle="collapse"
                      data-target="#customartcollaps"
                      aria-expanded="false"
                      aria-controls="customartcollaps">
                      <span
                        className="collapsed collapsed-custom p-3 d-xl-block d-lg-block d-md-block d-sm-none d-none"
                        data-toggle="collapse"
                        data-target="#animationcollaps"
                        aria-expanded="false"
                        aria-controls="animationcollaps"
                      >
                        <AssetsSvg.RightArrow />
                      </span>

                      <div
                        className="collapsed p-3 m-auto"
                        data-toggle="collapse"
                        data-target="#animationcollaps"
                        aria-expanded="false"
                        aria-controls="animationcollaps"
                      >
                        <AssetsSvg.TextBgColor />
                      </div>
                      <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        Custom Art
                      </p>
                    </div>
                  </div>
                  <div
                    id="customartcollaps"
                    className="collapse"
                    aria-labelledby="transition"
                    data-parent="#accordion"
                  >
                    <div className="trnsition-items">
                      <div className="mt-1 trnsition-items">
                        <div className="px-3">
                          <div className="image-creation-elements-expanded">
                            <div className="site-border-botom px-3">
                              <form>
                                <div className="form-group my-3">
                                  <select name="fontfamily" value={fabricState.fontData} id="selectFontFamily" className="form-control" onChange={(e) => fabricState.ControlFontText?.SelectionTextFamily(e.target.value)}>
                                    <option> circle </option>
                                    <option> rectangle </option>

                                  </select>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="site-border-botom">
              <div id="accordion">
                <div>
                  <div
                    id="transition"
                    onClick={() => props.setscreen("animationProperties")}
                  >
                    <div className="d-flex" id="headingThree">
                      <div
                        className="collapsed p-3 m-auto"
                        data-toggle="collapse"
                        data-target="#animationcollaps"
                        aria-expanded="false"
                        aria-controls="animationcollaps"
                      >
                        <AssetsSvg.AnimationIcon />
                      </div>
                      <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        Animation
                      </p>
                    </div>
                  </div>

                  <div
                    id="animationcollaps"
                    className="collapse"
                    aria-labelledby="transition"
                    data-parent="#accordion"
                  >
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
