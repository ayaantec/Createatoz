import { fabric } from 'fabric';

let prevListner: ((ev: KeyboardEvent) => void) | undefined;

export class FabricControlKeybord {
  private _clipboard?: fabric.Object;

  private Copy(): void {
    this.fabricCanvas.getActiveObject().clone((cloned: fabric.Object) => this._clipboard = cloned)
  }

  private Paste(): void {
    this._clipboard?.clone((clonedObj: fabric.Object) => {
      this.fabricCanvas.discardActiveObject();
      clonedObj.set({
        left: (clonedObj.left ?? 0) + 10,
        top: (clonedObj.top ?? 0) + 10,
        evented: true,
      });
      if (clonedObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = this.fabricCanvas;
        (clonedObj as fabric.ActiveSelection).forEachObject((obj) => {
          this.fabricCanvas.add(obj);
        });
        // this should solve the unselectability
        clonedObj.setCoords();
      } else {
        this.fabricCanvas.add(clonedObj);
      }
      if (this._clipboard && this._clipboard.top !== undefined && this._clipboard.left !== undefined) {
        this._clipboard.top += 10;
        this._clipboard.left += 10;
      }
      this.fabricCanvas.setActiveObject(clonedObj);
      this.fabricCanvas.requestRenderAll();
    });
  }

  private Delete(): void {
    const obj: fabric.Object = this.fabricCanvas.getActiveObject()
    if (obj.type === 'activeSelection') {
      this.fabricCanvas.getActiveObjects().forEach((obj: fabric.Object) => this.fabricCanvas.remove(obj));
      this.fabricCanvas.discardActiveObject();
    } else {
      this.fabricCanvas.remove(obj);
    }
  }

  private SelectAll(): void {
    this.fabricCanvas.discardActiveObject();
    const selection = new fabric.ActiveSelection(this.fabricCanvas.getObjects(), { canvas: this.fabricCanvas });
    this.fabricCanvas.setActiveObject(selection);
    this.fabricCanvas.requestRenderAll();
  }

  private DiscardSelection(): void {
    this.fabricCanvas.discardActiveObject();
  }

  private listenerKeyDown(ev: KeyboardEvent): void {
    const evntKey = ev.key?.toLowerCase();
    if (evntKey === 'c' && ev.ctrlKey) {
      this.Copy();
    } else if (evntKey === 'v' && ev.ctrlKey) {
      this.Paste();
    } else if (evntKey === 'delete') {
      this.Delete();
    } else if (evntKey === 'a' && ev.ctrlKey) {
      this.SelectAll();
    } else if (evntKey === 'escape') {
      this.DiscardSelection();
    }
  }

  constructor(private fabricCanvas: fabric.Canvas) {
    if (!!prevListner) {
      window.document.removeEventListener('keydown', prevListner);
    };
    prevListner = this.listenerKeyDown.bind(this);
    window.document.addEventListener('keydown', prevListner);
  }
}