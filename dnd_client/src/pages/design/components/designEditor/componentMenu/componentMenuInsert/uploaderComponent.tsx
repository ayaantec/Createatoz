import React, { useEffect } from 'react'
import { Spinner } from '../../../../../../common';
import { useFunctionalityAudioUpload, useFunctionalityImagesChoose, useFunctionalityVideoUpload } from '../../../../../admin';

type Props = {
  type: string;
}

export function Uploader(props: Props): JSX.Element {
  const {
    state: imgState,
    setImageName,
    setCostType,
    setImgFile,
    onCreateImage
  } = useFunctionalityImagesChoose();

  const {
    vidState,
    setVideoName,
    setVideoCostType,
    setVideoFile,
    onUploadVideo
  } = useFunctionalityVideoUpload();

  const {
    audioState,
    setAudioName,
    setAudioCostType,
    setAudioFile,
    onUploadAudio
  } = useFunctionalityAudioUpload()

  useEffect(() => {
    if (imgState.imageName !== "" && imgState.costType !== "" && imgState.imgFile !== undefined) onCreateImage();
  }, [imgState.imgFile]);

  useEffect(() => {
    if (vidState.videoName !== "" && vidState.costType !== "" && vidState.videoFile !== undefined) onUploadVideo();
  }, [vidState.videoFile]);

  useEffect(() => {
    if (audioState.audioName !== "" && audioState.costType !== "" && audioState.audioFile !== undefined) onUploadAudio();
  }, [audioState.audioFile]);

  return (
    <div className="site-border-botom p-3">
      {props.type === "Image" ? (
        <div>
          <label className="site-upload-btn w-100 p-2 mb-0 text-center cur-point" htmlFor="menuInsertImageUploadInput">
            {imgState.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Upload New '}{props.type}
          </label>
          <input className="d-none" id="menuInsertImageUploadInput" type="file" accept="image/*" onChange={e => {
            setImageName(e.target.files?.[0].name);
            setCostType("0");
            setImgFile(e.target.files?.[0]);
          }} />
        </div>
      ) : props.type === "Video" ? (
        <div>
          <label className="site-upload-btn w-100 p-2 mb-0 text-center cur-point" htmlFor="menuInsertVideoUploadInput">
            {vidState.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Upload New '}{props.type}
          </label>

          <input className="d-none" id="menuInsertVideoUploadInput" type="file" accept="video/*" onChange={e => {
            setVideoName(e.target.files?.[0].name);
            setVideoCostType("0");
            setVideoFile(e.target.files?.[0]);
          }} />
        </div>
      ) : props.type === "Audio" ? (
        <div>
          <label className="site-upload-btn w-100 p-2 mb-0 text-center cur-point" htmlFor="menuInsertAudioUploadInput">
            {audioState.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Upload New '}{props.type}
          </label>

          <input className="d-none" id="menuInsertAudioUploadInput" type="file" accept="audio/*" onChange={e => {
            setAudioName(e.target.files?.[0].name);
            setAudioCostType("0");
            setAudioFile(e.target.files?.[0]);
          }} />
        </div>
      ) : null}
    </div>
  );
}