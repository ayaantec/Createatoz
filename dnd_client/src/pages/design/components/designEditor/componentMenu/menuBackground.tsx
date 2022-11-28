import React from 'react';
import { AssetsSvg } from '../../../../../assets';
import { useFunctionalityImagesChoose } from '../../../../admin';
import { FabricStateContext } from '../../../designPage';

export function MenuBackground(): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);
  const [currentBg, setCurrentBg] = React.useState<string>();
  const {
    searchText,
    setSearchText,
    images
  } = useFunctionalityImagesChoose();
  const designBgUrl = fabricState.ControlImage?.GetCurrentBackgroundUrl();
  return (
    <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
      <div className="image-creation-elements">
        <div className="d-flex cur-point" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" id="headingThree">
          <div className="p-3 m-auto">
            <AssetsSvg.InsertBackground />
          </div>
          <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Background</p>
          <span className="collapsed collapsed-custom p-3 d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <AssetsSvg.DownArrow />
          </span>
        </div>
        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
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
                <a href="javascript:void(0)">
                  <div className="search-filter p-1">
                    <AssetsSvg.SearchFilter />
                  </div>
                </a>
              </div>
            </div>
            <div className="design-background">
              {(currentBg || designBgUrl) && (
                <div className="mt-1 current-itmes">
                  <div className="p-3">
                    <p>Currently using this design</p>
                    <div className="current-singleitem-background">
                      <img className="img-fluid" src={currentBg || designBgUrl} alt="" />
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-1 other-itmes">
                <div className="p-3">
                  <div className="d-flex">
                    <p className="flex-grow-1 mb-1">Trending</p>
                    {/* eslint-disable-next-line */}
                    {/* <a href="javascript:void(0)">
                      <p className="flex-grow-1 mb-1">See All</p>
                    </a> */}
                  </div>
                  <div className="row">
                    {images.map(i => (
                      <div className="col-4 p-2">
                        <div className="other--single-itme-background">
                          <img
                            className="img-fluid cur-point"
                            src={i.imgUrl}
                            alt=""
                            onClick={() => {
                              if (i.imgUrl) {
                                const url = i.imgUrlProxy || i.imgUrl;
                                fabricState?.ControlImage?.SetBackground(url);
                                setCurrentBg(url);
                              }
                            }}
                          />
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
  );
}