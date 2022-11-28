/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { AssetsSvg } from '../../../assets';
import { useFunctionalityAudioUpload, useFunctionalityImagesChoose, useFunctionalityVideoUpload } from '../secondaryPages/hooks';
import { useFunctionalityFontsChoose } from '../secondaryPages/hooks'
import Select from 'react-select';
import { useFunctionalityElementsChoose } from '../secondaryPages/hooks';
import { DomID, fileSize, oneKb, videoFileSize, oneMB } from '../../../config';
import { BootstrapUtils } from '../../../utils';
import { Spinner } from '../../../common';
import { toast } from 'react-toastify';
import { useSelectorTyped } from "../../../core";
import { useDispatch } from "react-redux";
import { ActionsDeletaion } from "../../../core/redux/slice/adminDelete";

type Props = {
  type: 'Font' | 'Image' | 'Video' | 'Shape' | 'Line' | 'Animation' | 'Sticker' | 'Sound or Music',
}

export function AddModal(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const {
    state,
    imgTagPicker,
    onCreateImage,
    setImageName,
    setImgFile,
    setCostType,
    setCurrencyValue,
    setThumbnailFile
  } = useFunctionalityImagesChoose();

  const {
    statefont,
    setFontName,
    fontTagPicker,
    setFontFile,
    setFontCostType,
    setFontCurrencyValue,
    onCreateFont,
    setFontImage
  } = useFunctionalityFontsChoose();

  const {
    stateelement,
    onCreateElement,
    setElementName,
    setElementFile,
    elemenTagPicker,
    setElementCostType,
    setElementCurrencyValue,
    setElementType,
    setElementThumbnailFile
  } = useFunctionalityElementsChoose();

  const {
    audioState,
    audioTagPicker,
    setAudioName,
    setAudioFile,
    setAudioCostType,
    setAudioCurrencyValue,
    onUploadAudio
  } = useFunctionalityAudioUpload();

  const {
    vidState,
    videoTagPicker,
    setVideoName,
    setVideoFile,
    setVideoCostType,
    setVideoCurrencyValue,
    onUploadVideo,
    setVideoThumbnailFile,
    onUpdateVideo,
    onDeleteVideo
  } = useFunctionalityVideoUpload();

  // const videoId = useSelectorTyped((state) => state.deleteOption.videoId);
  // React.useEffect(() => {
  //   if (videoId?.id && videoId.name) {
  //     setVideoName(videoId.name);
  //   }
  // }, [videoId]);
  // made for to check is it for update and delete, or not 

  const [, setCurrency1] = React.useState<string>('');

  const currentTagPicker = props.type === 'Font' ? fontTagPicker
    : props.type === 'Video' ? videoTagPicker
      : props.type === 'Image' ? imgTagPicker
        : props.type === 'Sound or Music' ? audioTagPicker
          : props.type === 'Shape' ? elemenTagPicker
            : undefined;

  const checkThumbnailDimension = (event: any, type: string) => {
    var file: number | undefined = event.target.files?.item(0)?.size;
    if (file !== undefined && file <= fileSize) {
      var img = new Image();
      img.src = window.URL.createObjectURL(event.target.files?.[0]);
      img.onload = () => {
          if(type === 'Image'){
            setThumbnailFile(event.target.files?.[0]);
          }
          else if(type === 'Video'){
            setVideoThumbnailFile(event.target.files?.[0]);
          }
          else if(type === 'Shape' || type === 'Line' || type === 'Animation' || type === 'Sticker'){
            setElementThumbnailFile(event.target.files?.[0]);
          }
          else if(type === 'Font'){
            setFontImage(event.target.files?.[0])
          }              
      };
    } else {
      toast.error(`${type} thumbnail size exceeded.`);
    }
  };

  const videoFileValidation = (fileDetails: any) => {
    var file: number | undefined = fileDetails.size;
    if (file !== undefined && file <= videoFileSize) {
      setVideoFile(fileDetails)
    }
    else {
      toast.error('Video File size exceeded.');
    }
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-4">
            <div>
              <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)}>
                Add new {props.type} 
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id={DomID.Modals.CommonModal} className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New {props.type}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="inputAddress"> {props.type} Name</label>
                  {props.type === 'Font' ? (
                    <input type="text" className="form-control" value={statefont.fontName} onChange={e => setFontName(e.target.value)} />
                  ) : props.type === 'Image' ? (
                    <input type="text" className="form-control" value={state.imageName} onChange={e => setImageName(e.target.value)} />
                  ) : props.type === 'Video' ? (
                    <input type="text" className="form-control" value={vidState.videoName} onChange={e => setVideoName(e.target.value)} />
                  ) : props.type === 'Sound or Music' ? (
                    <input type="text" className="form-control" value={audioState.audioName} onChange={e => setAudioName(e.target.value)} />
                  ) : props.type === 'Shape' || props.type === 'Line' || props.type === 'Animation' || props.type === 'Sticker' ? (
                    <input type="text" className="form-control" value={stateelement.elementName} onChange={e => setElementName(e.target.value)} />
                  ) : null}
                </div>
              </form>
              {props.type === 'Image' ? (
                <>
                  <div className="py-2" >
                    <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                      <span className="ml-2">
                        <label htmlFor="Uploadimage">Upload
                          <AssetsSvg.AdminUpload />
                        </label>
                      </span>
                    </a>
                    <input className="d-none" type="file" id="Uploadimage" accept=".svg" onChange={(e) => setImgFile(e.target.files?.[0])} />
                    <label className="pl-2"> {state?.imgFile?.name} </label>
                    <label className="pl-2"> (Svg only) </label>
                  </div>
                  <div className="py-2" >
                    <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                      <span className="ml-2">
                        <label htmlFor="imgThumbnailUpload">Upload
                          <AssetsSvg.AdminUpload />
                        </label>
                      </span>
                    </a>
                    <input className="d-none" type="file" id="imgThumbnailUpload" accept=".img, .png, .jpg" max-file-size="100000"
                      onChange={(event) => {
                        checkThumbnailDimension(event, props.type)
                        //setThumbnailFile(e.target.files?.[0]);
                      }}
                    />

                    <label className="pl-2"> {state.thumbnailFile?.name} </label>
                    <label className="pl-2"> (Image thumbnail, max limit `${fileSize / oneKb} kb) </label>
                  </div>
                </>

              ) : props.type === 'Video' ? (
                <>
                  <div className="py-2" >
                    <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                      <span className="ml-2">
                        <label htmlFor="videoUpload">Upload
                          <AssetsSvg.AdminUpload />
                      </label>
                    </span>
                  </a>
                  <input className="d-none" type="file" id="videoUpload" accept='.mp4, .mkv, .flv, .avi' onChange={(e) => videoFileValidation(e.target.files?.[0])} />
                  <label className="pl-2"> {vidState?.videoFile?.name} </label>
                  {vidState?.videoFile ? null : <label className="pl-2"> (Video, max limit `${videoFileSize/oneMB} MB) </label>}
                </div>
                <div className="py-2" >
                <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                  <span className="ml-2">
                    <label htmlFor="videoThumbnailUpload">Upload
                          <AssetsSvg.AdminUpload />
                        </label>
                      </span>
                    </a>
                    <input className="d-none" type="file" id="videoThumbnailUpload" accept=".img, .png, .jpg" max-file-size="100000"
                      onChange={(event) => {
                        checkThumbnailDimension(event, props.type)
                      }}
                    />

                    <label className="pl-2"> {vidState.thumbnailFile?.name} </label>
                    <label className="pl-2"> (Video thumbnail, max limit `${fileSize / oneKb} kb) </label>
                  </div>
                </>
              ) : props.type === 'Sound or Music' ? (
                <div className="py-2" >
                  <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                    <span className="ml-2">
                      <label htmlFor="audioUpload">Upload
                        <AssetsSvg.AdminUpload />
                      </label>
                    </span>
                  </a>
                  <input className="d-none" type="file" id="audioUpload" accept='.mp3' onChange={(e) => setAudioFile(e.target.files?.[0])} />
                  <label className="pl-2"> {audioState?.audioFile?.name} </label>
                </div>
              ) : props.type === 'Font' ? (
                <div className="py-2" >
                  <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                    <span className="ml-2">
                      <label htmlFor="fontUpload">Upload
                        <AssetsSvg.AdminUpload />
                      </label>
                    </span>
                  </a>
                  <input className="d-none" type="file" id="fontUpload" accept='.ttf, .woff2' onChange={(e) => setFontFile(e.target.files?.[0])} />


                  <label className="pl-2"> {statefont.fontFile?.name} </label>
                </div>
              ) : props.type === 'Shape' || props.type === 'Line' || props.type === 'Animation' || props.type === 'Sticker' ? (
                <>
                  <div className="py-2" >
                    <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                      <span className="ml-2">
                        <label htmlFor="elementUpload">Upload
                          <AssetsSvg.AdminUpload />
                        </label>
                      </span>
                    </a>
                    <input className="d-none" type="file" id="elementUpload" onChange={(e) => { setElementFile(e.target.files?.[0]); setElementType(props.type) }} />
                    <label className="pl-2"> {stateelement.elementFile?.name} </label>
                  </div>
                  <div className="py-2" >
                    <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                      <span className="ml-2">
                        <label htmlFor="elementThumbnailUpload">Upload
                          <AssetsSvg.AdminUpload />
                        </label>
                      </span>
                    </a>
                    <input className="d-none" type="file" id="elementThumbnailUpload" accept=".img, .png, .jpg" max-file-size="100000"
                      onChange={(event) => {
                        checkThumbnailDimension(event, props.type)
                      }}
                    />

                    <label className="pl-2"> {stateelement.thumbnailFile?.name} </label>
                    <label className="pl-2"> (Thumbnail, max limit `${fileSize / oneKb} kb)</label>
                  </div>
                </>
              ) : null}
              {
                props.type === 'Font' ? (
                  <div className="py-2">
                    <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                      <span className="ml-2">
                        <label htmlFor="fontimageUpload">  Upload Font Image
                          <AssetsSvg.AdminUpload />
                        </label>
                      </span>
                    </a>
                    <input className="d-none" type="file" name="fontimageUpload" id="fontimageUpload" accept=".img, .png, .jpg" onChange={(event) => checkThumbnailDimension(event, props.type)} />
                    <label className="pl-2"> {statefont.fontImage?.name} </label>
                  </div>
                ) : null
              }
              {/* <form>
                <div className="form-group my-2 ">
                  <Select
                    options={currentTagPicker?.apiTags?.map(t => ({ label: t.displayName, value: t.id }))}
                    onChange={(opt, meta) => {
                      if (meta.action === 'select-option' && !!opt) {
                        currentTagPicker?.toggleTagSelection(opt.value);
                      }
                    }}
                    isClearable
                    isSearchable
                  />
                </div>
              </form> */}
              <form className="d-flex my-3">
                <div className="form-check mr-3">
                  <label className="form-check-label" htmlFor="radio1" >
                    <input type="radio"
                      className="form-check-input"
                      id="radio1"
                      name="optradio"
                      defaultValue="Free"
                      checked={
                        props.type === 'Image' ? state.costType === '0'
                          : props.type === 'Sound or Music' ? audioState.costType === '0'
                            : props.type === 'Video' ? vidState.costType === '0'
                              : props.type === 'Font' ? statefont.costType === '0'
                                : stateelement.costType === '0'}
                      value={'0'}
                      onClick={() => {
                        switch (props.type) {
                          case 'Image': {
                            setCostType('0');
                            break;
                          }
                          case 'Sound or Music': {
                            setAudioCostType('0');
                            break;
                          }
                          case 'Video': {
                            setVideoCostType('0');
                            break;
                          }
                          case 'Font': {
                            setFontCostType('0');
                            break;
                          }
                          case 'Animation' || 'Sticker' || 'Shape' || 'Line': {
                            setElementCostType('0');
                            break;
                          }
                          default: return;
                        }
                      }} />Free
                  </label>
                </div>
                <div className="form-check mr-3">
                  <label className="form-check-label" htmlFor="radio1">
                    <input type="radio"
                      className="form-check-input"
                      id="radio1"
                      name="optradio"
                      defaultValue="Free"
                      checked={
                        props.type === 'Image' ? state.costType === '1'
                          : props.type === 'Sound or Music' ? audioState.costType === '1'
                            : props.type === 'Video' ? vidState.costType === '1'
                              : props.type === 'Font' ? statefont.costType === '1'
                                : stateelement.costType === '1'}
                      value={'1'}
                      onClick={() => {
                        switch (props.type) {
                          case 'Image': {
                            setCostType('1');
                            break;
                          }
                          case 'Sound or Music': {
                            setAudioCostType('1');
                            break;
                          }
                          case 'Video': {
                            setVideoCostType('1');
                            break;
                          }
                          case 'Font': {
                            setFontCostType('1');
                            break;
                          }
                          case 'Animation' || 'Sticker' || 'Shape' || 'Line': {
                            setElementCostType('1');
                            break;
                          }
                          default: return;
                        }
                      }} />Premium content
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="radio1">
                    <input type="radio"
                      className="form-check-input"
                      id="radio1"
                      name="optradio"
                      defaultValue="Free"
                      checked={
                        props.type === 'Image' ? state.costType === '2'
                          : props.type === 'Sound or Music' ? audioState.costType === '2'
                            : props.type === 'Video' ? vidState.costType === '2'
                              : props.type === 'Font' ? statefont.costType === '2'
                                : stateelement.costType === '2'}
                      value={'2'}
                      onClick={() => {
                        switch (props.type) {
                          case 'Image': {
                            setCostType('2');
                            break;
                          }
                          case 'Sound or Music': {
                            setAudioCostType('2');
                            break;
                          }
                          case 'Video': {
                            setVideoCostType('2');
                            break;
                          }
                          case 'Font': {
                            setFontCostType('2');
                            break;
                          }
                          case 'Animation' || 'Sticker' || 'Shape' || 'Line': {
                            setElementCostType('2');
                            break;
                          }
                          default: return;
                        }
                      }} />Exclusive content
                  </label>
                </div>
              </form>


              {(state.costType !== '0' || statefont.costType !== '0' || vidState.costType !== '0' || audioState.costType !== '0' || stateelement.costType !== '0') ? (
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputState">Currency type</label>
                      <select id="inputState" className="form-control" value="currency1" onChange={(e) => setCurrency1(e.target.value)}>
                        <option selected>American Dollar</option>
                        <option>...</option>
                      </select>
                    </div>

                    {props.type === 'Font' ? (
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Set Price</label>
                        <input type="text" className="form-control" placeholder="$3.25" value={statefont.currencyValue} onChange={(e) => setFontCurrencyValue(e.target.value)} />
                      </div>
                    ) : props.type === 'Image' ? (
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Set Price</label>
                        <input type="text" className="form-control" placeholder="$3.25" value={state.currencyValue} onChange={(e) => setCurrencyValue(e.target.value)} />
                      </div>
                    ) : props.type === 'Video' ? (
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Set Price</label>
                        <input type="text" className="form-control" placeholder="$3.25" value={vidState.currencyValue} onChange={(e) => setVideoCurrencyValue(e.target.value)} />
                      </div>
                    ) : props.type === 'Sound or Music' ? (
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Set Price</label>
                        <input type="text" className="form-control" placeholder="$3.25" value={audioState.currencyValue} onChange={(e) => setAudioCurrencyValue(e.target.value)} />
                      </div>
                    ) : props.type === 'Shape' || props.type === 'Line' || props.type === 'Animation' || props.type === 'Sticker' ? (
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Set Price</label>
                        <input type="text" className="form-control" placeholder="$3.25" value={stateelement.currencyValue} onChange={(e) => { setElementCurrencyValue(e.target.value); }} />
                      </div>

                    ) : null}
                  </div>
                </form>
              ) : null}
            </div>

            <div className="modal-footer">
              {/* made for delete option */}
              {/* {videoId?.id ? (
                    <div
                      className="flex-grow-1 d-flex cur-point"
                      onClick={() => {
                        if (videoId !== undefined){
                          onDeleteVideo(videoId.id);
                        }
                      }}
                    >
                      <div className="d-flex">
                        <p className="my-auto">{vidState.isBusy ? <Spinner /> : "Delete"}</p>
                        <AssetsSvg.DeleteIcon />
                      </div>
                    </div>
                  ) : null} */}
              <a className="secondary-btn-link px-3 py-2  text-center" href="javascript:void(0)" data-dismiss="modal"> Cancel</a>
              {props.type === 'Font' ? (
                <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={onCreateFont}> {statefont.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Add Font'}</a>
              ) : props.type === 'Image' ? (
                <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={onCreateImage}> {state.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Add Image'}</a>
              ) : props.type === 'Video' ? (
                <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={onUploadVideo}> {vidState.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Add Video'} </a>
                // <>
                //   {videoId?.id ? 
                //     <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={()=> onUpdateVideo(videoId.id)}> {vidState.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Update Video'} </a>
                //   :
                //   }
                // </>
                // made for update option
              ) : props.type === "Sound or Music" ? (
                <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={onUploadAudio}> {audioState.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Add Audio'} </a>
              ) : props.type === 'Shape' || props.type === 'Line' || props.type === 'Animation' || props.type === 'Sticker' ? (
                <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={onCreateElement}> {stateelement.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Add Element'}</a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}