import React from "react";
import { DomID, RoutesAppUi, RoutesAsset } from "../../../config";
import { ApiHooks, useSelectorTyped } from "../../../core";
import { Link } from "react-router-dom";
import { BootstrapUtils } from "../../../utils";
import { UserModalImageDownload, UserModalVideoDownload, UserModalAudioDownload, BannerChangerModal } from '../../../../src/pages/user/modals';

type FileData = {
  url?: string;
  proxyUrl?: string;
  displayName?: string;
}

export function PageDiscover(): JSX.Element {
  const userProfile = useSelectorTyped(state => state.user.profile);
  if (userProfile) {
    let userID = userProfile.id
  }

  const { data: apiImagesData } = ApiHooks.Admin.Images.GetAllImages.useHook()
  const { data: apiVideosData } = ApiHooks.Admin.Videos.GetAllVideos.useHook();
  const { data: apiAudioData } = ApiHooks.Admin.Audio.GetAllAudio.useHook();
  const [price, setPrice] = React.useState(Number)
  const [costtype, setCostType] = React.useState(Number)
  const [vidcosttype, setVidCostType] = React.useState(Number)
  const [vidprice, setVidPrice] = React.useState(Number)
  const [audcosttype, setAudCostType] = React.useState(Number)
  const [audprice, setAudPrice] = React.useState(Number)
  const [selectedFile, setSelectedFile] = React.useState<FileData>();
  const [ID, setID] = React.useState(String)
  const [userId, setUserId] = React.useState(Boolean)
  const [videoID, setVideoID] = React.useState(String)
  const [audioId, setAudioID] = React.useState(String)
  const [videoUserId, setVideoUserId] = React.useState(Boolean)
  const [audioUserId, setAudioUserId] = React.useState(Boolean)
  let imageIteration: number = 0;
  let videoIteration: number = 0;
  let audioIteration: number = 0;
  console.log("image in discover page", apiImagesData)
  console.log("video in discover page", apiVideosData)

  let type = '';

  return (
    <>
      <UserModalImageDownload
        fileUrl={selectedFile?.proxyUrl}
        filename={selectedFile?.displayName}
        priceamount={price}
        costtype={costtype}
        id={ID}
        onClose={() => setSelectedFile(undefined)}
        userID={userId}
        type="image" />
      <UserModalVideoDownload
        videoUrl={selectedFile?.url}
        videoUrlProxy={selectedFile?.proxyUrl}
        videopriceamount={vidprice}
        videocosttype={vidcosttype}
        videoName={selectedFile?.displayName}
        videoid={videoID}
        videouserID={videoUserId}
        onClose={() => setSelectedFile(undefined)} />
      <UserModalAudioDownload
        audioUrl={selectedFile?.url}
        audioPropxyUrl={selectedFile?.proxyUrl}
        audioName={selectedFile?.displayName}
        audiocosttype={audcosttype}
        audiopriceamount={audprice}
        audioID={audioId}
        audiouserID={audioUserId}
        onClose={() => setSelectedFile(undefined)}
      />
      <div className="container-fluid">
        <div>
          <div className="custom-shadow site-main-content-body">
            <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0">
              <div className="md-border-radious overflow-hidden gry-bg">
                <div className="row">
                  <div className="col-12">
                    <div className="py-3 px-3">
                      <div>
                        <div>
                          <div>
                            <div className="site-border-bottom py-2 mb-3">
                              <h2 className="mb-0 font-weight-bold blue-text">
                                Explore CreateA2Z
                            </h2>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <BannerChangerModal type="Image" />
                                {/* <img className="img-fluid"
                                  src={RoutesAsset.Banners.Banner03}
                                  alt=''
                                  onClick={() => {
                                    type = 'image'
                                  }}
                                  data-toggle="modal"
                                  data-target={BootstrapUtils.GetSelectorById(DomID.Modals.CoverBanner)}
                                /> */}
                              </div>
                            </div>

                            <div>
                              <div className="site-border-top pt-3 mt-3 d-flex">
                                <h2 className="blue-text flex-grow-1 ">
                                  Images
                              </h2>
                                <div>
                                  <Link to={RoutesAppUi.AllImage.Root} >
                                    <div>
                                      <p className="mb-0" >
                                        See All
                                       </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>

                              <div>
                                <div className="row flex-row flex-nowrap overflow-auto-hover pb-2">

                                  {apiImagesData?.map(img => (

                                    Number(imageIteration) < 6 ? (
                                      <>
                                        {
                                          img.prices[0] !== undefined ?
                                            (
                                              <>
                                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                                                  onClick={() => {
                                                    setSelectedFile({ displayName: img.displayName, url: img.imgUrl, proxyUrl: img.imgUrlProxy });
                                                    if (userProfile) {
                                                      console.log("logged in user : ", userProfile.name)
                                                      console.log(img.users, "logged in user : ", userProfile.id, "found image : ", img.users.find(user => user.userId.includes(userProfile.id)))

                                                      if (img.users.find(user => user.userId.includes(userProfile.id))?.userId === (userProfile.id)) {
                                                        console.log(img.users, "logged in user : ", userProfile.id)
                                                        setUserId(false)
                                                      } else {
                                                        setUserId(true)
                                                      }

                                                    }
                                                    setCostType(img.costType); setPrice(img.prices[0].value); setID(img.id)
                                                  }}>
                                                  <a data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.ViewImageDownload)}>
                                                    <div className="template-thumb template-thumb-discover ">
                                                      <img
                                                        className="img-fluid"
                                                        {...imageIteration++}
                                                        src={img.imgUrl}
                                                        alt={img.id}
                                                      />
                                                      <p>{img.users[0].userId} {userProfile?.id}</p>
                                                    </div>
                                                  </a>
                                                </div>
                                              </>
                                            ) :
                                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                                              onClick={() => { setSelectedFile({ displayName: img.displayName, url: img.imgUrl, proxyUrl: img.imgUrlProxy }); setCostType(img.costType); setPrice(0); setID(img.id) }}>
                                              <a data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.ViewImageDownload)}>
                                                <div className="template-thumb template-thumb-discover ">
                                                  <img
                                                    className="img-fluid"
                                                    {...imageIteration++}
                                                    src={img.imgUrl}
                                                    alt={img.id}
                                                  />
                                                </div>
                                              </a>
                                            </div>
                                        }

                                      </>

                                    ) : null
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

            <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0 mt-3">
              <div className="md-border-radious overflow-hidden gry-bg">
                <div className="row">
                  <div className="col-12">
                    <div className="py-3 px-3">
                      <div>
                        <div>
                          <div>
                            <div className="row">
                              <div className="col-12">
                                <BannerChangerModal type="Video" />
                                {/* <img className="img-fluid"
                                  src={RoutesAsset.Banners.Banner04}
                                  alt=''
                                  onClick={() => {
                                    type = 'video'
                                  }}
                                  data-toggle="modal"
                                  data-target={BootstrapUtils.GetSelectorById(DomID.Modals.CoverBanner)}
                                /> */}
                              </div>
                            </div>
                            <div>
                              <div className="site-border-top pt-3 mt-3 d-flex">
                                <h2 className="blue-text flex-grow-1 ">
                                  Videos
                              </h2>
                                <div>
                                  <Link to={RoutesAppUi.AllVideo.Root} >
                                    <div>
                                      <p className="mb-0" >
                                        See All
                                       </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>

                              <div>
                                <div className="row flex-row flex-nowrap overflow-auto-hover pb-2">

                                  {apiVideosData?.map(video => (

                                    videoIteration < 6 ? (
                                      <>
                                        {
                                          video.prices[0] !== undefined ? (
                                            <div
                                              className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                                              onClick={() => {
                                                setSelectedFile({ displayName: video.dispalyName, url: video.videoUrl, proxyUrl: video.videoProxyUrl });
                                                if (userProfile) {
                                                  console.log("logged in user : ", userProfile.name)
                                                  console.log(video.users, "logged in user : ", userProfile.id, "found image : ", video.users.find(user => user.userId.includes(userProfile.id)))

                                                  if (video.users.find(user => user.userId.includes(userProfile.id))?.userId === (userProfile.id)) {
                                                    console.log(video.users, "logged in user : ", userProfile.id)
                                                    setUserId(false)
                                                  } else {
                                                    setUserId(true)
                                                  }

                                                }
                                                setVidCostType(video.costType); setVidPrice(video.prices[0].value); setVideoID(video.id)
                                              }}>

                                              <a data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.ViewVideoDownload)}>
                                                <div className="template-thumb template-thumb-discover">
                                                  <video loop muted autoPlay>
                                                    <source src={video.videoUrl}
                                                      {
                                                      ...videoIteration++
                                                      } />
                                                  </video>
                                                </div>

                                              </a>
                                            </div>
                                          ) :
                                            <div
                                              className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                                              onClick={() => { setSelectedFile({ displayName: video.dispalyName, url: video.videoUrl, proxyUrl: video.videoProxyUrl }); setVidCostType(video.costType); setVidPrice(0); setVideoID(video.id) }}>

                                              <a data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.ViewVideoDownload)}>
                                                <div className="template-thumb template-thumb-discover">
                                                  <video loop muted autoPlay>
                                                    <source src={video.videoUrl}
                                                      {
                                                      ...videoIteration++
                                                      } />
                                                  </video>
                                                </div>

                                              </a>
                                            </div>
                                        }


                                      </>
                                    ) : null
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

            <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0 mt-3">
              <div className="md-border-radious overflow-hidden gry-bg">
                <div className="row">
                  <div className="col-12">
                    <div className="py-3 px-3">
                      <div>
                        <div>
                          <div>
                            <div className="row">
                              <div className="col-12">
                                <BannerChangerModal type="Audio" />
                                {/* <img className="img-fluid"
                                  src={RoutesAsset.Banners.Banner05}
                                  alt=''
                                  data-toggle="modal"
                                  data-target={BootstrapUtils.GetSelectorById(DomID.Modals.CoverBanner)}
                                  data-id="audio"
                                /> */}
                              </div>
                            </div>
                            <div>
                              <div className="site-border-top pt-3 mt-3 d-flex">
                                <h2 className="blue-text flex-grow-1 ">
                                  Sounds and Musics
                              </h2>

                                <div>
                                  <Link to={RoutesAppUi.AllAudio.Root} >
                                    <div>
                                      <p className="mb-0" >
                                        See All
                                       </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>

                              <div>
                                <div className="row flex-row flex-nowrap overflow-auto-hover pb-2">



                                  {apiAudioData?.map(audio => (
                                    audioIteration < 3 ? (
                                      <>
                                        {
                                          audio.prices[0] !== undefined ? (
                                            <div
                                              className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6"
                                              onClick={() => {
                                                setSelectedFile({ displayName: audio.displayName, url: audio.audioUrl, proxyUrl: audio.audioProxyUrl });
                                                if (userProfile) {
                                                  console.log("logged in user : ", userProfile.name)
                                                  console.log(audio.users, "logged in user : ", userProfile.id, "found image : ", audio.users.find(user => user.userId.includes(userProfile.id)))

                                                  if (audio.users.find(user => user.userId.includes(userProfile.id))?.userId === (userProfile.id)) {
                                                    console.log(audio.users, "logged in user : ", userProfile.id)
                                                    setUserId(false)
                                                  } else {
                                                    setUserId(true)
                                                  }

                                                }
                                                setAudCostType(audio.costType); setAudPrice(audio.prices[0].id); setAudioID(audio.id)
                                              }}>

                                              <a data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.ViewAudioDownload)}>
                                                <div className="template-thumb template-thumb-discover flex-column p-3">

                                                  <audio controls>
                                                    <source src={audio.audioUrl}
                                                      {
                                                      ...audioIteration++
                                                      } />
                                                  </audio>
                                                  <div className="mt-3 w-100 text-left">
                                                    <p className="mb-0 font-weight-bold ">{audio.displayName}</p>
                                                  </div>
                                                </div>

                                              </a>
                                            </div>
                                          ) :
                                            <div
                                              className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6"
                                              onClick={() => { setSelectedFile({ displayName: audio.displayName, url: audio.audioUrl, proxyUrl: audio.audioProxyUrl }); setAudCostType(audio.costType); setAudPrice(0); setAudioID(audio.id) }}>

                                              <a data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.ViewAudioDownload)}>
                                                <div className="template-thumb template-thumb-discover flex-column p-3">

                                                  <audio controls>
                                                    <source src={audio.audioUrl}
                                                      {
                                                      ...audioIteration++
                                                      } />
                                                  </audio>
                                                  <div className="mt-3 w-100 text-left">
                                                    <p className="mb-0 font-weight-bold ">{audio.displayName}</p>
                                                  </div>
                                                </div>

                                              </a>
                                            </div>
                                        }

                                      </>
                                    ) : null
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
          </div>
        </div>
      </div>
    </>
  );
}
