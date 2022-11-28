import { TypeDesignConfigData } from "../models";

type TypeDesignConfigDataV0 = {
  width: number;
  height: number;
  fabricData?: string;
  templateUrl?: string;
}

type TypeDesignConfigDataV1 = {
  version: 1;
  width: number;
  height: number;
  fabricData?: string;
  templateUrl?: string;
}

export const DesignConfigDataMigration = (data: { [key: string]: unknown }): TypeDesignConfigData => {
  let _data = JSON.parse(JSON.stringify(data));
  if (!('version' in _data)) {
    _data['version'] = 0;
  }
  while (true) {
    switch (_data['version']) {
      case 0: {
        const pConfig = _data as TypeDesignConfigDataV0; 
        const nConfig: TypeDesignConfigDataV1 = {
          ...pConfig,
          version: 1,
        }
        _data = nConfig;
        break;
      }
      default: return _data as TypeDesignConfigData;
    }
  }
};