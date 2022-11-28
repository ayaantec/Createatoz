import { FabricElementTypes } from "../../models";
import { fabric } from 'fabric';
import { FontFaceMgr } from "../fontFaceMgr";
import { toast } from "react-toastify";

export class FabricControlFontText {
  constructor(
    private fabricCanvas: fabric.Canvas,
    private task: { onStart: () => void, onEnd: () => void },
  ) { }

  public async SelectionTextFamily(id: string): Promise<void> {
    this.task.onStart();
    const obj = this.fabricCanvas?.getActiveObject();
    if (obj.type === FabricElementTypes.IText) {
      const _obj = obj as fabric.IText;
      try {
        const fontFamily = await FontFaceMgr.LoadFontById(id);
        _obj?.set('fontFamily', fontFamily);
        this.fabricCanvas?.requestRenderAll();
      } catch (e) {
        toast.error('Error loading font');
      }
    }
    this.task.onEnd();
  }

  /**
 * @function AddText() Adds text object to the canvas
 * @param {number} fontSize Size for the font
 * @param {string} placeholder Text to show
 * @returns {void} `void`
 */
  public Addtext(fontSize: number, placeholder: string): void {
    this.fabricCanvas?.add(
      new fabric.IText(placeholder, {
        left: 0,
        top: 0,
        fill: "#333",
        fontSize: fontSize,
        fontWeight: "normal"
      }),
    );
  }

  public async AddTextByFontFamily(id: string, placeholder: string): Promise<void> {
    this.task.onStart();
    try {
      const fontFamily = await FontFaceMgr.LoadFontById(id);
      this.fabricCanvas?.add(
        new fabric.IText(placeholder, {
          left: 0,
          top: 0,
          fontFamily: fontFamily,
          fill: "#333",
          fontSize: 14,
          fontWeight: "normal"
        })
      );
    } catch (e) {
      toast.error('Error loading font');
    }
    this.task.onEnd();
  }
}