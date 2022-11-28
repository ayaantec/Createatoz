/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { AssetsSvg } from "../../../assets";
import { DomID, offset, RoutesAppUi } from "../../../config";
import { useSelectorTyped } from "../../../core";
import { TypeVideoData } from "../../../models";
import { BootstrapUtils } from "../../../utils";
import { UserModalVideoDownload } from "../../user/modals";
import { AddModal } from "../modals";
import { DeleteModal } from "../modals/deleteModal";
import { useFunctionalityVideosChoose } from "./hooks";

export function PageAdminVideos(): JSX.Element {
  const [videoId, setVideoId] = React.useState<string | undefined>();
  const { searchText, setSearchText, videos } = useFunctionalityVideosChoose();

  const isAdmin = useSelectorTyped((state) => state.user.isAdmin);
  const isCollaborator = useSelectorTyped((state) => state.user.isCollaborator);
  const [selectedVideo, setSelectedVideo] = React.useState<TypeVideoData>();
  const [price, setPrice] = React.useState(Number);
  const [costtype, setCostType] = React.useState(Number);
  const [ID, setID] = React.useState(String);
  const userProfile = useSelectorTyped((state) => state.user.profile);
  const [userId, setUserID] = React.useState(Boolean);

  const [videoSumData, setVideoSumData] = React.useState<TypeVideoData[]>([]);
  const [data, setData] = React.useState<TypeVideoData[]>([]);
  const [end, setEnd] = React.useState<number>(0);
  const [hasMoreData, setHasMoreData] = React.useState<boolean>(false);
  
  const initialVideoDataSplit = (video: TypeVideoData[]) => {
    if (video && video.length >= 0) {
      let videoData = video;
      const reverseData = videoData.reverse();
      setData(reverseData);
      setVideoDataForLoading(offset, reverseData);
    }
  };

  const setVideoDataForLoading = (endPoint: number, list: TypeVideoData[]) => {
    if(endPoint <= list.length) {
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
    setVideoSumData(list.slice(0, endPoint));
    setEnd(endPoint + offset);
  };

  const fetchMoreData = () => {
    setVideoDataForLoading(end, data);
  };

  React.useEffect(() => {
    if (videos && videos.length >= 0) {
      initialVideoDataSplit(videos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos]);
  
  return (
    <>
      <UserModalVideoDownload
        videoUrl={selectedVideo?.videoUrl}
        videoUrlProxy={selectedVideo?.videoProxyUrl}
        videoName={selectedVideo?.dispalyName}
        videocosttype={costtype}
        videopriceamount={price}
        videoid={ID}
        videouserID={userId}
        onClose={() => setSelectedVideo(undefined)}
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
                All Videos{" "}
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
                    <h1 className="pb-2">Videos</h1>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="site-content-without-headding p-4"
              id="videos-scroll-parent"
            >
              <InfiniteScroll
                dataLength={videoSumData.length}
                next={fetchMoreData}
                hasMore={hasMoreData}
                scrollableTarget="videos-scroll-parent"
                className="pt-2"
                loader={<h3 className='text-white pt-2'>Fetching more items...</h3>}
              >
                {isAdmin || isCollaborator ? <AddModal type="Video" /> : null}
                {isAdmin || isCollaborator ? <DeleteModal type='Video' id={videoId}/> : null}
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
                        <div className="d-flex">
                          {/* {tags.map(tag => (
                          <div key={tag.id} className="tags-desing mr-2">
                            <a href="javascript:void(0)">
                              <span className="my-auto">
                                <p className="mb-0 my-auto px-3 py-2">{tag.displayName}</p>
                              </span>
                            </a>
                          </div>
                        ))} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="template-view-grid">
                    {videoSumData.map((video) =>
                      isAdmin || isCollaborator ? (
                        <div className="template-ctl">
                          <div className="mb-3">
                            <div className="video-ctl">
                              <div className="video-content">
                                {/* <video loop muted autoPlay>
                                  <source src={video.videoUrl} />
                                </video> */}
                                <img
                                  className="img-fluid"
                                  src={video.videoThumbUrl}
                                  alt={video.dispalyName}
                                />
                              </div>

                              <div className="video-options">
                                <div className="row">
                                  <div className="col-7">
                                    <div className="p-2 px-3 content-name">
                                      <p className="mb-0 font-weight-bold ">
                                        {video.dispalyName}
                                      </p>
                                      <p className="mb-0 gry-text">
                                        <a>
                                          By<span className="ml-2">Admin</span>
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-5 d-flex">
                                    <div 
                                      className="ml-auto p-1 ml-auto my-auto"
                                      data-toggle="modal"
                                      data-target={BootstrapUtils.GetSelectorById(
                                        DomID.Modals.DeleteModal
                                      )} 
                                      onClick={() => setVideoId(video.id)}
                                      >
                                      
                                        <button className="secondary-btn-link px-2 py-1 text-center btn-sm">Delete</button>

                                    </div>
                                    {/* <div className="p-2 my-auto mr-2">
                                      <a href="javascript:void(0)">
                                        <span>
                                          <AssetsSvg.AdminEdit02 />
                                        </span>
                                      </a>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : video.prices[0] !== undefined ? (
                        <div
                          className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                          onClick={() => {
                            setSelectedVideo(video);
                            if (userProfile) {
                              console.log(
                                "logged in user : ",
                                userProfile.name
                              );
                              console.log(
                                video.users,
                                "logged in user : ",
                                userProfile.id,
                                "found image : ",
                                video.users.find((user) =>
                                  user.userId.includes(userProfile.id)
                                )
                              );

                              if (
                                video.users.find((user) =>
                                  user.userId.includes(userProfile.id)
                                )?.userId === userProfile.id
                              ) {
                                console.log(
                                  video.users,
                                  "logged in user : ",
                                  userProfile.id
                                );
                                setUserID(false);
                              } else {
                                setUserID(true);
                              }
                            }
                            setCostType(video.costType);
                            setPrice(video.prices[0].value);
                            setID(video.id);
                          }}
                        >
                          <a
                            data-toggle="modal"
                            data-target={BootstrapUtils.GetSelectorById(
                              DomID.Modals.ViewVideoDownload
                            )}
                          >
                            <div className="template-thumb template-thumb-discover">
                              <video loop muted autoPlay>
                                <source src={video.videoUrl} />
                              </video>
                            </div>
                          </a>
                        </div>
                      ) : (
                        <div
                          className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                          onClick={() => {
                            setSelectedVideo(video);
                            setCostType(video.costType);
                            setPrice(0);
                            setID(video.id);
                          }}
                        >
                          <a
                            data-toggle="modal"
                            data-target={BootstrapUtils.GetSelectorById(
                              DomID.Modals.ViewVideoDownload
                            )}
                          >
                            <div className="template-thumb template-thumb-discover">
                              <video loop muted autoPlay>
                                <source src={video.videoUrl} />
                              </video>
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
