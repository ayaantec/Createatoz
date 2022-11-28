import { FabricElementTypes } from "../../models";

export class FabricControlSelectionImage {
  constructor(
    private fabricCanvas: fabric.Canvas,
  ) { }

  /**
   * @function SelectionImageClone() Clone the currently selected image
   * @returns {void} `void`
   */
  public SelectionImageClone(): void {
    const currentObj = this.fabricCanvas?.getActiveObject();
    if (currentObj && currentObj.type === FabricElementTypes.Image) {
      currentObj.clone((cloned: fabric.Object) => {
        cloned.left = (cloned.left ?? 0) + 12;
        cloned.top = (cloned.left ?? 0) + 12;
        this.fabricCanvas?.add(cloned);
      });
    }
  }

  /**
   * @function SelectionImageDelete() Delete the currently selected image
   * @returns {void} `void`
   */
  public SelectionImageDelete(): void {
    const currentObj = this.fabricCanvas?.getActiveObject();

    if (currentObj && currentObj.type === FabricElementTypes.Image) {
      this.fabricCanvas?.remove(currentObj);
      this.fabricCanvas?.discardActiveObject();
      this.fabricCanvas?.requestRenderAll();
    }
  }

  /**
   * @function SelectionImageRotate180() Rotate the currently selected image 180 degree
   * @returns {void} `void`
   */
  public SelectionImageRotate180(): void {
    const currentObj = this.fabricCanvas?.getActiveObject();

    if (currentObj && currentObj.type === FabricElementTypes.Image) {
      currentObj.rotate((currentObj.angle ?? 0) + 180);
      this.fabricCanvas?.requestRenderAll();
    }
  }

  /**
   * @function SelectionImageRotateCW45() Rotate the currently selected image 45 degree clock-wise
   * @returns {void} `void`
   */
  public SelectionImageRotateCCW45(): void {
    const currentObj = this.fabricCanvas?.getActiveObject();

    if (currentObj && currentObj.type === FabricElementTypes.Image) {
      currentObj.rotate((currentObj.angle ?? 0) - 45);
      this.fabricCanvas?.requestRenderAll();
    }
  }

  /**
   * @function SelectionImageRotateCW90() Rotate the currently selected image 90 degree clock-wise
   * @returns {void} `void`
   */
  public SelectionImageRotateCW90(): void {
    const currentObj = this.fabricCanvas?.getActiveObject();

    if (currentObj && currentObj.type === FabricElementTypes.Image) {
      currentObj.rotate((currentObj.angle ?? 0) + 90);
      this.fabricCanvas?.requestRenderAll();
    }
  }

  /**
   * @function SelectionImageRotateCCW90() Rotate the currently selected image 90 degree counter-clock-wise
   * @returns {void} `void`
   */
  public SelectionImageRotateCCW90(): void {
    const currentObj = this.fabricCanvas?.getActiveObject();

    if (currentObj && currentObj.type === FabricElementTypes.Image) {
      currentObj.rotate((currentObj.angle ?? 0) - 90);
      this.fabricCanvas?.requestRenderAll();
    }
  }

  /**
   * @function SelectionImageFlip() Flip the currently selected image
   * @returns {void} `void`
   */
  public SelectionImageFlip(): void {
    const currentObj = this.fabricCanvas?.getActiveObject();

    if (currentObj && currentObj.type === FabricElementTypes.Image) {
      currentObj.set('flipX', !currentObj.flipX);
      this.fabricCanvas?.requestRenderAll();
    }
  }
}