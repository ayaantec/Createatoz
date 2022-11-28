/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { AssetsSvg } from "../../../assets";
import { DomID, offset, RoutesAppUi } from "../../../config";
import { useSelectorTyped } from "../../../core";
import { TypeAudioData } from "../../../models";
import { BootstrapUtils } from "../../../utils";
import { UserModalAudioDownload } from "../../user/modals";
import { AddModal } from "../modals";
import { useFunctionalityAudioChoose } from "./hooks";
import { DeleteModal } from "../modals/deleteModal";

export function PageAdminAudios(): JSX.Element {
  const [audioId, setAudioId] = React.useState<string | undefined>();
  const { searchText, setSearchText, audios } = useFunctionalityAudioChoose();

  const isAdmin = useSelectorTyped((state) => state.user.isAdmin);
  const isCollaborator = useSelectorTyped((state) => state.user.isCollaborator);
  const [selectedFile, setSelectedFile] = React.useState([] as any);
  const [selectedName, setSelectedName] = React.useState("");
  const [price, setPrice] = React.useState(Number);
  const [costtype, setCostType] = React.useState(Number);
  const [ID, setID] = React.useState(String);
  const userProfile = useSelectorTyped((state) => state.user.profile);
  const [userId, setUserID] = React.useState(Boolean);

  const [audioSumData, setAudioSumData] = React.useState<TypeAudioData[]>([]);
  const [data, setData] = React.useState<TypeAudioData[]>([]);
  const [end, setEnd] = React.useState<number>(0);
  const [hasMoreData, setHasMoreData] = React.useState<boolean>(false);
  
  const initialAudioDataSplit = (audio: TypeAudioData[]) => {
    if (audio && audio.length >= 0) {
      let audioData = audio;
      const reverseData = audioData.reverse();
      setData(reverseData);
      setAudioDataForLoading(offset, reverseData);
    }
  };

  const setAudioDataForLoading = (endPoint: number, list: TypeAudioData[]) => {
    if(endPoint <= list.length) {
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
    setAudioSumData(list.slice(0, endPoint));
    setEnd(endPoint + offset);
  };

  const fetchMoreData = () => {
    setAudioDataForLoading(end, data);
  };

  React.useEffect(() => {
    if (audios && audios.length >= 0) {
      initialAudioDataSplit(audios);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audios]);

  return (
    <>
      <UserModalAudioDownload
        audioUrl={selectedFile}
        audioName={selectedName}
        audiocosttype={costtype}
        audiopriceamount={price}
        audioID={ID}
        audiouserID={userId}
        onClose={() => setSelectedFile(undefined)}
      />

      {isAdmin || isCollaborator ? null : (
        <div className="md-border-radious overflow-hidden gry-bg mb-3">
          <div className="p-3 d-flex">
            <Link to={RoutesAppUi.Discover.Root}>
              <a className="cur-point" href="javascript:void(0)">
                <p className="mb-0 blue-text mr-2">Discover</p>
              </a>
            </Link>
            <p className="mb-0 mr-2">&gt;</p>
            <a>
              <p className="mb-0 blue-text mr-2 font-weight-bold">
                {" "}
                All Sounds and Musics{" "}
              </p>
            </a>
          </div>
        </div>
      )}

      <div className="container-fluid gry-bg">
        <div className=" py-3">
          <div className="white-bg custom-shadow site-main-content-body">
            <div>
              <div className="row">
                <div className="col-12">
                  <div className="px-4 pt-4">
                    <h1 className="pb-2">Sounds and Musics</h1>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="site-content-without-headding p-4"
              id="audio-scroll-parent"
            >
              <InfiniteScroll
                dataLength={audioSumData.length}
                next={fetchMoreData}
                hasMore={hasMoreData}
                scrollableTarget="audio-scroll-parent"
                className="pt-2"
                loader={<h3 className='text-white pt-2'>Fetching more items...</h3>}
              >
                {/* <AddModal type="Audio" /> */}
                {isAdmin || isCollaborator ? (
                  <AddModal type="Sound or Music" />
                ) : null}
                {isAdmin || isCollaborator ? <DeleteModal type='Audio' id={audioId}/> : null}
                <div className="pb-4">
                  <div className="site-search">
                    <div className="d-flex flex-wrap">
                      <div className="flex-grow-1 mr-2">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Search"
                            className="form-control"
                            name="searchText"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                          />
                          <span className="input-group-text search-icon p-0 px-2">
                            <a>
                              <AssetsSvg.AdminSearchIcon />
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3 py-1 site-border-top site-border-bottom d-none">
                  <div className="py-2 catagory-scroll overflow-x">
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    {audioSumData.map((audio) =>
                      isAdmin || isCollaborator ? (
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                          <div className="mb-3">
                            <div className="audio-admin-ctl">
                              <audio controls>
                                <source src={audio.audioUrl} />
                              </audio>
                              <div className="video-options">
                                <div className="row">
                                  <div className="col-9">
                                    <div className="p-2 px-3 content-name">
                                      <p className="mb-0 font-weight-bold ">
                                        {audio.displayName}
                                      </p>
                                      <p className="mb-0 gry-text">
                                        <a>
                                          By<span className="ml-2">Admin</span>
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-3 d-flex ">
                                    <div 
                                      className="ml-auto p-2 ml-auto my-auto"
                                      data-toggle="modal"
                                      data-target={BootstrapUtils.GetSelectorById(
                                        DomID.Modals.DeleteModal
                                      )} 
                                      onClick={() => setAudioId(audio.id)}
                                      >
                                        <button className="secondary-btn-link px-2 py-1 text-center btn-sm">Delete</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : audio.prices[0] !== undefined ? (
                        <div
                          className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                          onClick={() => {
                            setSelectedFile(audio.audioProxyUrl);
                            if (userProfile) {
                              console.log(
                                "logged in user : ",
                                userProfile.name
                              );
                              console.log(
                                audio.users,
                                "logged in user : ",
                                userProfile.id,
                                "found image : ",
                                audio.users.find((user) =>
                                  user.userId.includes(userProfile.id)
                                )
                              );

                              if (
                                audio.users.find((user) =>
                                  user.userId.includes(userProfile.id)
                                )?.userId === userProfile.id
                              ) {
                                console.log(
                                  audio.users,
                                  "logged in user : ",
                                  userProfile.id
                                );
                                setUserID(false);
                              } else {
                                setUserID(true);
                              }
                            }
                            setSelectedName(audio.displayName!);
                            setCostType(audio.costType);
                            setPrice(audio.prices[0].value);
                            setID(audio.id);
                          }}
                        >
                          <a
                            data-toggle="modal"
                            data-target={BootstrapUtils.GetSelectorById(
                              DomID.Modals.ViewAudioDownload
                            )}
                          >
                            <div className="template-thumb template-thumb-discover ">
                              <audio controls>
                                <source src={audio.audioUrl} />
                              </audio>
                            </div>
                          </a>
                        </div>
                      ) : (
                        <div
                          className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                          onClick={() => {
                            setSelectedFile(audio.audioProxyUrl);
                            setSelectedName(audio.displayName!);
                            setCostType(audio.costType);
                            setPrice(0);
                            setID(audio.id);
                          }}
                        >
                          <a
                            data-toggle="modal"
                            data-target={BootstrapUtils.GetSelectorById(
                              DomID.Modals.ViewAudioDownload
                            )}
                          >
                            <div className="template-thumb template-thumb-discover ">
                              <audio controls>
                                <source src={audio.audioUrl} />
                              </audio>
                            </div>
                          </a>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
