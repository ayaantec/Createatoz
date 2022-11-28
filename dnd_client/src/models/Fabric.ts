import { TypeDesignConfigData } from "./design";

export enum FabricElementTypes {
  IText = "i-text",
  Text = "text",
  Image = "image",
  Rectangle = "rect",
  Circle = "circle",
  Path = "path",
  Video = "video",
  Group = "group"
}

type TypedDataHelper<T extends FabricElementTypes, P> = { type: T; data?: P };

export type TypeFabricObjectSelection =
  | TypedDataHelper<
    FabricElementTypes.IText | FabricElementTypes.Text,
    {
      isBold?: boolean;
      isItalic?: boolean;
      isUnderline?: boolean;
      charSpacing?: number;
      lineHeight?: number;
      offsetEffect?: number;
      shadowDirection?: number;
      blurEffect?: number;
    }
  >
  | TypedDataHelper<
    FabricElementTypes.Image,
    {
      isLocked?: boolean;
    }
  >
  | TypedDataHelper<
    FabricElementTypes.Rectangle,
    {
      height?: number;
    }
  >
  | TypedDataHelper<
    FabricElementTypes.Circle,
    {
      height?: number;
    }
  >
  | TypedDataHelper<
    FabricElementTypes.Path,
    {
      height?: number;
    }
  >
  | TypedDataHelper<
    FabricElementTypes.Group,
    {
      colors: string[];
    }
  >
  | TypedDataHelper<
    FabricElementTypes.Video,
    undefined
  >;

export type TFabricCurrentStateData = {
  selection?: TypeFabricObjectSelection;
  isPanMode?: boolean;
  canZoomIn?: boolean;
  canZoomOut?: boolean;
};

export type TFabricDesignData = {
  designId: string;
  configData: TypeDesignConfigData,
};
