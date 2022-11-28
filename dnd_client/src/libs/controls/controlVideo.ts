import { fabric } from 'fabric';
import { VideoMgr } from '../videoMgr';

export class FabricControlVideo {
  public static readonly VideoSourceId = 'video_id';

  constructor(private fabricCanvas: fabric.Canvas) { }

  public async AddVideo(id: string, video_src: string): Promise<void> {
    try {
      const elem = await VideoMgr.AppendVideo(id, video_src);
      const img = new fabric.Image(elem, {
        objectCaching: false,
        crossOrigin: 'anonymous',
      });
      img.set(FabricControlVideo.VideoSourceId as any, id);
      this.fabricCanvas.add(img);
      (img.getElement() as HTMLVideoElement).play();
    } catch (e) {}
  }

  public InitializeOnJsonLoad(obj: fabric.Image): void {
    const id: string = obj.get(FabricControlVideo.VideoSourceId as any);
    if (!!id && typeof id !== 'string') return;
    const elem = VideoMgr.GetElementById(id);
    if (elem) if (!!id) {
      elem.play();
      (obj as fabric.Image).setElement(elem);
    };
  }
}