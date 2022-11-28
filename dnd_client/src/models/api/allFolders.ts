import { ApiSchemaDesignData } from "./design";
import { ApiSchemaFontData } from "./fonts";
import { ApiSchemaImageData } from "./images";

export type ApiSchemaAllFolders = {
  id: number;
  name?: string;
  parentFolderId?: number;
  isRoot: boolean;
  designs?: ApiSchemaDesignData[];
  images?: ApiSchemaImageData[];
  fonts?: ApiSchemaFontData[];
}