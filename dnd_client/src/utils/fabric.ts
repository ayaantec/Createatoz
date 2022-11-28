import { fabric } from 'fabric';
import { TypeDesignConfigData } from '../models';
class UtilsFabricFucntions {
  public IsObjectLocked(obj?: fabric.Object): boolean {
    return obj?.lockMovementX
      || obj?.lockMovementY
      || obj?.lockRotation
      || obj?.lockScalingFlip
      || obj?.lockScalingX
      || obj?.lockScalingY
      || obj?.lockSkewingX
      || obj?.lockSkewingY
      || obj?.lockUniScaling
      || false;
  }

  public ToggleObjectLock(obj?: fabric.Object): void {
    const isLocked = this.IsObjectLocked(obj);
    obj?.set({
      lockMovementX: !isLocked,
      lockMovementY: !isLocked,
      lockRotation: !isLocked,
      lockScalingFlip: !isLocked,
      lockScalingX: !isLocked,
      lockScalingY: !isLocked,
      lockSkewingX: !isLocked,
      lockSkewingY: !isLocked,
      lockUniScaling: !isLocked,
    });
  }

  public ScaleObject(obj: fabric.Object, dimentions: Partial<Record<'cH' | 'cW' | 'oH' | 'oW', number>>): void {
    const scaleX = (dimentions.cW ?? 1) / (dimentions.oW ?? 1);
    const scaleY = (dimentions.cH ?? 1) / (dimentions.oH ?? 1);
    obj.scaleX = scaleX;
    obj.scaleY = scaleY;
    if (obj.top) {
      obj.top = obj.top * scaleY;
    }
    if (obj.left) {
      obj.left = obj.left * scaleX;
    }
    obj.setCoords();
  }

  public IsDesignConfigSame(dConfig1: TypeDesignConfigData, dConfig2?: TypeDesignConfigData): boolean {
    return (
      dConfig1.fabricData === dConfig2?.fabricData
      && dConfig1.audioData?.audioId === dConfig2?.audioData?.audioId
      && dConfig1.audioData?.loop === dConfig2?.audioData?.loop
    );
  }
}

export const UtilsFabric = new UtilsFabricFucntions();