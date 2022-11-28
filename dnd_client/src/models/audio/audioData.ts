import { TypeTagData } from "../tags";

export type TypeAudioData = {
  id: string;
  displayName?: string;
  tags?: TypeTagData[],
  audioUrl?: string;
  audioUrlProxy?: string;
}