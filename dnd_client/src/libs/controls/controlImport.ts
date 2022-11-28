import { RoutesAppApi } from "../../config";
import { AxiosAuth } from "../../core";
import { ApiSchemaFontData, ApiSchemaVideoData, FabricElementTypes } from "../../models";
import { FontFaceMgr } from "../fontFaceMgr";
import { fabric } from 'fabric';
import { FabricControlVideo } from "./controlVideo";
import { VideoMgr } from "../videoMgr";

type FabricJsonData = {
  version?: string,
  objects?: { [key: string]: unknown, type?: string }[],
}

export class FabricControlImport {
  private readonly ControlVideo: FabricControlVideo;
  constructor(
    private fabricCanvas: fabric.Canvas,
    private task: { onStart: () => void, onEnd: () => void },
  ) {
    this.ControlVideo = new FabricControlVideo(fabricCanvas);
  }

  private async preloadVideos(ids: string[]): Promise<null> {
    for (const id of ids) {
      try {
        const videoData = await AxiosAuth.get<ApiSchemaVideoData>(RoutesAppApi.Video.ById(id)).then(res => res.data);
        if (!!videoData.fileUrlProxy) {
          await VideoMgr.AppendVideo(id, videoData.fileUrlProxy);
        }
      } catch (e) { }
    }
    return Promise.resolve(null);
  }

  private async preloadFontFamily(fontFamilies: string[]): Promise<null> {
    for (const fontFamily of fontFamilies) {
      const id = FontFaceMgr.GetIdByFontFamily(fontFamily);
      if (id === undefined) continue;
      try {
        const fontData = await AxiosAuth.get<ApiSchemaFontData>(RoutesAppApi.Font.ById(id)).then(res => res.data);
        if (!!fontData.fileUrlProxy) {
          FontFaceMgr.AppendFontFace(id, fontData.fileUrlProxy);
          await FontFaceMgr.LoadFontById(id);
        }
      } catch (e) { }
    }
    return Promise.resolve(null);
  }

  async LoadFromJson(data: string): Promise<void> {
    this.task.onStart();
    const fabricData: FabricJsonData | undefined = JSON.parse(data);
    const fontFamilies: string[] = fabricData?.objects
      ?.filter(obj => obj.type === FabricElementTypes.IText)
      .map(obj => (obj as unknown as fabric.IText).fontFamily)
      .filter((fontFamily): fontFamily is string => typeof fontFamily === 'string') ?? [];
    const videoIds: string[] = fabricData?.objects
      ?.filter(obj => obj.type === FabricElementTypes.Image && !!obj[FabricControlVideo.VideoSourceId])
      .map(obj => obj[FabricControlVideo.VideoSourceId])
      .filter((id): id is string => typeof id === 'string') ?? [];

    await this.preloadFontFamily(fontFamilies);
    await this.preloadVideos(videoIds);

    this.fabricCanvas.loadFromJSON(
      data,
      () => {
        this.fabricCanvas.requestRenderAll();
        this.task.onEnd();
      },
      (_: object, obj?: fabric.Object) => {
        if (obj?.type === FabricElementTypes.Image && FabricControlVideo.VideoSourceId in obj) {
          this.ControlVideo.InitializeOnJsonLoad(obj as fabric.Image);
        }
      }
    )
  }
}