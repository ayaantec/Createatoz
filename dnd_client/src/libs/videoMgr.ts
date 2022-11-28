class VideoManager {

  AppendVideo(id: string, url: string): Promise<HTMLVideoElement> {
    return new Promise((resolve, _) => {
      let prev = window.document.getElementById(id) as HTMLVideoElement | null;
      if (!prev) {
        const newElem = window.document.createElement('video') as HTMLVideoElement;
        newElem.id = id;
        newElem.muted = true;
        newElem.loop = true;
        newElem.autoplay = true;
        newElem.onloadedmetadata = () => {
          newElem.height = newElem.videoHeight;
          newElem.width = newElem.videoWidth;
          resolve(newElem);
        };
        newElem.crossOrigin = 'anonymous';
        newElem.setAttribute('muted', 'true');
        newElem.setAttribute('style', 'display: none');
        const elemSrc = window.document.createElement('source') as HTMLSourceElement;
        elemSrc.setAttribute('src', url);
        newElem.appendChild(elemSrc);
        window.document.body.appendChild(newElem);
        prev = newElem;
      } else {
        resolve(prev);
      }
    });
  }

  GetElementById(id: string): HTMLVideoElement | null {
    return window.document.getElementById(id) as HTMLVideoElement;
  }
}

export const VideoMgr = new VideoManager();