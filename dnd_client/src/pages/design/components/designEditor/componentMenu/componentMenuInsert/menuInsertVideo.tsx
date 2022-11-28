import React from 'react';
import { AssetsSvg } from '../../../../../../assets';
import { DesignEditorMenuScreen } from "../../imageEditor"
import { FabricStateContext } from '../../../../designPage';
import { ApiHooks } from '../../../../../../core';
import { Uploader } from '.';

type Props = { setMenuScreen: (scr: DesignEditorMenuScreen) => void };

export function MenuInsertVideo(props: Props): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);
  const { data: apiVideoData } = ApiHooks.Admin.Videos.GetAllVideos.useHook();
  const [searchText, setSearchText] = React.useState<string>('');
  const videoData = React.useMemo(() => {
    const data = Array.isArray(apiVideoData) ? apiVideoData : [];
    if (searchText) {
      const _searchText = searchText.toLowerCase();
      return data.filter(v => v.dispalyName?.toLowerCase().includes(_searchText));
    } else {
      return data;
    }
  }, [searchText, apiVideoData]);
  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
          <div className="image-creation-elements image-creation-elements-details">
            <div className="d-flex site-border-botom" id="headingThree">
              <div className="back-btn p-3">
                <div>
                  <AssetsSvg.Back className="cur-point" onClick={() => props.setMenuScreen("defaultMenu")} />
                </div>
              </div>
              <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Insert Video</p>
            </div>
            
            <Uploader type="Video"/>

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
                  {/* <div className="choose-video">
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
                                    />
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="other--single-itme-background">
                                    <img
                                      className="img-fluid"
                                      src={RoutesAsset.DefaultBackground.Background07}
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="col-4 p-2">
                                  <div className="other--single-itme-background">
                                    <img
                                      className="img-fluid"
                                      src={RoutesAsset.DefaultBackground.Background03}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="choose-video">
                    <div className="mt-1 other-itmes">
                      <div className="p-3">
                        <div className="d-flex">
                          <p className="flex-grow-1 mb-1">Trending</p>
                          {/* <div>
                            <p className="flex-grow-1 mb-1">See All</p>
                          </div> */}
                        </div>
                        <div className="row">
                          {videoData?.map(vid => (
                            <div key={vid.id} className="mt-1 other-itmes">
                              <div className="p-3">
                                <div className="other--single-itme cur-point" onClick={() => {
                                  if (!!vid.id && !!vid.videoProxyUrl) {
                                    fabricState.ControlVideo?.AddVideo(vid.id, vid.videoProxyUrl);
                                  }
                                }}>
                                  <video className="img-fluid img-cover" loop muted autoPlay>
                                    <source src={vid.videoUrl} />
                                  </video>
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