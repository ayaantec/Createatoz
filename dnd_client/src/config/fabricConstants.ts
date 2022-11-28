import { fabric } from "fabric";
import { EnumFabricTemplate } from "./appRoute";

type TemplateDimention = {
  height: number,
  width: number,
}

export const FabricConstants = {
  Text: {
    FontSize: {
      Heading: 40,
      Subheading: 26,
      Body: 18
    },
    FontWeight: {
      Normal: "normal",
      Bold: "bold"
    },
    FontStyles: ({
      Italic: "italic",
      Normal: "normal",
      Oblique: "oblique",
      None: ""
    } as unknown) as {
      [key: string]: InstanceType<typeof fabric.IText>["fontStyle"];
    },
    Fontunderline: {
      Normal: false,
      Underline: true
    }
  }
};

export type TFabricTemplateValues = { [key: string]: TemplateDimention };

export const FabricTemplatesValues: TFabricTemplateValues = {
  [EnumFabricTemplate.FacebookPhotoCover]: {
    width: 820, height: 462,
  },
  [EnumFabricTemplate.FacebookEventCover]: {
    width: 1920, height: 1080,
  },
  [EnumFabricTemplate.FacebookPost]: {
    width: 1200, height: 630,
  },
  [EnumFabricTemplate.InstagramPhotoSquare]: {
    width: 1080, height: 1080,
  },
  [EnumFabricTemplate.InstagramPhotoLandscape]: {
    width: 1080, height: 566,
  },
  [EnumFabricTemplate.InstagramPhotoPotrait]: {
    width: 600, height: 750,
  },
  [EnumFabricTemplate.InstagramStories]: {
    width: 1080, height: 1920,
  },
};