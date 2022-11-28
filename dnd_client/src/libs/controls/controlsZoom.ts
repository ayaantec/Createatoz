export class FabricControlZoom {
  constructor(
    private fabricCanvas: fabric.Canvas,
    private updateData: (canZoomIn: boolean, canZoomOut: boolean) => void,
  ) {
    updateData(true, false);
  }

  private __setZoomWithLimit(operation: 'in' | 'out'): void {
    let delta = 0;
    switch (operation) {
      case 'in': {
        delta = delta - 100;
        break;
      }
      case 'out': {
        delta = delta + 100;
        break;
      }
    }
    var zoom = this.fabricCanvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 2) zoom = 2;
    if (zoom < 1) zoom = 1;
    if (this.fabricCanvas.viewportTransform) {
      this.fabricCanvas.viewportTransform[4] = 0;
      this.fabricCanvas.viewportTransform[5] = 0;
    }
    this.fabricCanvas?.setZoom(zoom);
    this.updateData(
      zoom < 2,
      zoom > 1,
    );
  }

  public ZoomIn(): void {
    this.__setZoomWithLimit('in');
  }

  public ZoomOut(): void {
    this.__setZoomWithLimit('out');
  }
}