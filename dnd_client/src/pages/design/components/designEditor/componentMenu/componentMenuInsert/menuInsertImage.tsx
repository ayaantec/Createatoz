import React from 'react';
import { AssetsSvg } from '../../../../../../assets';
import { DesignEditorMenuScreen } from "../../imageEditor"
import { FabricStateContext } from '../../../../designPage';
import { useFunctionalityImagesChoose } from '../../../../../admin'
import { Uploader } from './uploaderComponent';

type Props = { setscreen: (scr: DesignEditorMenuScreen) => void };

export function MenuInsertImage(props: Props): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);
  const {
    searchText,
    setSearchText,
    images
  } = useFunctionalityImagesChoose();

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
          <div className="image-creation-elements image-creation-elements-details">
            <div className="d-flex site-border-botom" id="headingThree">
              <div className="back-btn p-3">
                <div>
                  <AssetsSvg.Back className="cur-point" onClick={() => props.setscreen("defaultMenu")} />
                </div>
              </div>
              <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Insert Image</p>
            </div>
            
            <Uploader type="Image"/>

            <div id="collapseOne" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
              <div className="image-creation-elements-expanded">
                <div className="d-flex site-border-botom p-3">
                  <div className="input-group site-search-sm">
                    <input type="text" className="form-control" placeholder="Search" value={searchText} onChange={ev => setSearchText(ev.target.value)} />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <AssetsSvg.SearchIcon />
                      </span>
                    </div>
                  </div>
                  <div className="ml-2 d-none">
                    {/* eslint-disable-next-line */}
                    <a>
                      <div className="search-filter p-1">
                        <AssetsSvg.SearchFilter />
                      </div>
                    </a>
                  </div>
                </div>
                <div>
                  {/* <div className="choose-images">
                    <div>
                      <div className="mt-1 other-itmes">
                        <div className="p-3 site-border-botom">
                          <div className="d-flex">
                            <p className="flex-grow-1 mb-1">Your Uploads</p>
                            <div>
                              <p className="flex-grow-1 mb-1">See All</p>
                            </div>
                          </div>
                          <div className="mt-1 other-itmes">
                            <div>
                              <div className="row">
                                <div className="col-4 p-2">
                                  <div className="other--single-itme-background">
                                    <img
                                      className="img-fluid"
                                      src={RoutesAsset.DefaultBackground.Background02}
                                      alt=""
                                      onClick={() => fabricState?.ControlImage?.LoadImage(RoutesAsset.DefaultBackground.Background02)} />
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="other--single-itme-background">
                                    <img
                                      className="img-fluid"
                                      src={RoutesAsset.DefaultBackground.Background07}
                                      alt=""
                                      onClick={() => fabricState?.ControlImage?.LoadImage(RoutesAsset.DefaultBackground.Background07)} />
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="other--single-itme-background">
                                    <img
                                      className="img-fluid"
                                      src={RoutesAsset.DefaultBackground.Background03}
                                      alt=""
                                      onClick={() => fabricState?.ControlImage?.LoadImage(RoutesAsset.DefaultBackground.Background03)} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="choose-image">
                    <div className="mt-1 other-itmes">
                      <div className="p-3">
                        <div className="d-flex">
                          <p className="flex-grow-1 mb-1">Trending</p>
                          {/* <div>
                            <p className="flex-grow-1 mb-1">See All</p>
                          </div> */}
                        </div>
                        <div className="row">
                          {images.map(img => (
                            <div key={img.id} className="mt-1 other-itmes">
                              <div className="p-3">
                                <div className="other--single-itme cur-point" onClick={() => {
                                  fabricState.ControlImage?.LoadImage(img.imgUrlProxy || img.imgUrl);
                                  console.log(img.imgUrl +"\n"+ img.imgUrlProxy);
                                }}>
                                  <img className="img-fluid img-cover "
                                    src={img.imgUrlProxy}
                                    alt=""
                                  />
                                </div>
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
    </div>
  );
}