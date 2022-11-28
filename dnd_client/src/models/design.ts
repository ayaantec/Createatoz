export type TypeDesignAudioData = {
  audioId: string;
  loop: boolean;
}

export type TypeDesignConfigData = {
  version: 1;
  width: number;
  height: number;
  clientHeight?: number;
  clientWidth?: number;
  fabricData?: string;
  audioData?: TypeDesignAudioData;
  templateUrl?: string;
}