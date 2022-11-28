export class FabricControlObjectStacking {
  constructor (private fabricCanvas: fabric.Canvas) {}

  public BringSelectionForward(): void {
    const selected = this.fabricCanvas.getActiveObjects();
    selected.forEach(obj => this.fabricCanvas.bringForward(obj));
  }

  public BringSelectionToFront(): void {
    //sd
    const selected = this.fabricCanvas.getActiveObjects();
    selected.forEach(obj => this.fabricCanvas.bringToFront(obj));
  }

  public SendSelectionBackwards(): void {
    const selected = this.fabricCanvas.getActiveObjects();
    selected.forEach(obj => this.fabricCanvas.sendBackwards(obj));
  }

  public SendSelectionToBack(): void {
    const selected = this.fabricCanvas.getActiveObjects();
    selected.forEach(obj => this.fabricCanvas.sendToBack(obj));
  }
}