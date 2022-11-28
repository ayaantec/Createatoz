import { FabricElementTypes } from "../../models";
import { fabric } from 'fabric';

export class FabricControlTextEffects {

  private getDefaultShadow(): fabric.Shadow {
    return new fabric.Shadow('rgb(0,0,0) 5px 1px 1px')
  }

  private cloneShadow(shadow: fabric.Shadow): fabric.Shadow {
    return new fabric.Shadow({
      affectStroke: shadow.affectStroke,
      blur: shadow.blur,
      color: shadow.color,
      includeDefaultValues: shadow.includeDefaultValues,
      nonScaling: shadow.nonScaling,
      offsetX: shadow.offsetX,
      offsetY: shadow.offsetY,
    });
  }

  private getActiveIText(): fabric.IText | undefined {
    var obj = this.fabricCanvas?.getActiveObject();
    if (obj?.type === FabricElementTypes.IText) {
      return obj as fabric.IText;
    }
    return undefined;
  }

  private updateShadow(modifier: (shadow: fabric.Shadow) => void): void {
    const obj = this.getActiveIText();
    let shadow = obj?.get('shadow');
    if (typeof shadow == 'string' || typeof shadow === 'undefined' || shadow === null) {
      shadow = this.getDefaultShadow();
    } else {
      shadow = this.cloneShadow(shadow);
    }
    modifier(shadow);
    obj?.set('shadow', shadow);
    this.fabricCanvas?.requestRenderAll();
  }

  constructor(private fabricCanvas: fabric.Canvas) { }

  public SetShadowOffsetX(offset: string): void {
    this.updateShadow(shadow => {
      shadow.offsetX = Number(offset) * 0.1;
      shadow.affectStroke = true;
    });
  }

  public SetShadowOffsetY(offset: string): void {
    this.updateShadow(shadow => {
      shadow.offsetY = Number(offset) * 0.1;
      shadow.affectStroke = true;
    });
  }

  public SetShadowBlur(offset: string): void {
    this.updateShadow(shadow => shadow.blur = Number(offset) * .1);
  }

  public SetStrokeThickness(offset: string): void {
    const obj = this.getActiveIText();
    const stroke = obj?.get('stroke');
    if (typeof stroke !== 'string') {
      const stroke = obj?.get('fill');
      obj?.set('stroke', typeof stroke === 'string' ? stroke : 'black');
    }
    obj?.set('strokeWidth', Number(offset));
    this.fabricCanvas?.requestRenderAll();
  }

  public SetShadowColor(color: string): void {
    this.updateShadow(shadow => shadow.color = color);
  }

  public SetStrokeColor(color: string): void {
    const obj = this.getActiveIText();
    obj?.set('stroke', color);
    this.fabricCanvas?.requestRenderAll();
  }
}