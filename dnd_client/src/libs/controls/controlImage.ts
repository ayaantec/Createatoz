import { fabric } from 'fabric';
import { UtilsFabric, UUID } from '../../utils';

type FabricObject = fabric.Object & { id?: string };

export class FabricControlImage {
  constructor(
    private fabricCanvas: fabric.Canvas,
    private dimentions: { height?: number, width?: number },
    private taskStatus: { onTaskStart: () => void, onTaskFinish: () => void },
  ) { }

  /**
   * @function UploadImage() Uploads image from device and adds into the canvas
   * @param {File | undefined} file Selected file from the input
   * @returns {void} `void`
   */
  public UploadImage(file?: File): void {
    let reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target?.result;
      if (typeof data === "string") {
        fabric.Image.fromURL(data, (img) => {
          UtilsFabric.ScaleObject(img, {
            cW: this.fabricCanvas?.width,
            cH: this.fabricCanvas?.height,
            oW: this.dimentions.width,
            oH: this.dimentions.height,
          });
          this.fabricCanvas?.add(img).renderAll();
        });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  /**
   * @function LoadImage() Loads an image from URL and adds to the canvas
   * @param url URL of the image
   * @returns {void} `void`
   */
  public LoadImage(url: string): void {
    this.taskStatus.onTaskStart()
    fabric.util.loadImage(
      url,
      img => {
        const fImg = new fabric.Image(img);
        UtilsFabric.ScaleObject(fImg, {
          cW: this.fabricCanvas?.width,
          cH: this.fabricCanvas?.height,
          oW: this.dimentions.width,
          oH: this.dimentions.height,
        });
        this.fabricCanvas?.add(fImg);
        this.taskStatus.onTaskFinish()
      },
      null,
      'Anonymous'
    );
  }

  /**
   * @function SetBackground() Sets image as background to the canvas
   * @param url URL of the image
   * @returns {void} `void`
   */
  public SetBackground(url: string): void {
    fabric.Image.fromURL(url,
      img => {
        this.fabricCanvas?.setBackgroundImage(
          img,
          this.fabricCanvas?.renderAll.bind(this.fabricCanvas),
          {
            scaleX: Number(this.fabricCanvas.width) / Number(img.width),
            scaleY: Number(this.fabricCanvas.height) / Number(img.height),
            crossOrigin: 'Anonymous',
          },
        );
      },
      { crossOrigin: 'Anonymous' },
    );
  }

  public GetCurrentBackgroundUrl(): string | undefined {
    const img = this.fabricCanvas.backgroundImage;
    try {
      if (typeof img === 'string') return new URL(img).toString();
      if (typeof img === 'object') return new URL(img.getSrc()).toString();
      return undefined;
    } catch (e) {
      return undefined
    }
  }

  /**
   * @function LoadTemplate() Loads an `SVG` template to the canvas
   * @param url URL of the `SVG` template
   * @param config Optional configuration for importing the `SVG`
   * @returns {void} `void`
   */
  public LoadTemplate(url: string, config?: { group?: boolean, cacheBust?: boolean }): void {
    this.taskStatus.onTaskStart();
    let _url = url;
    if (config?.cacheBust || true) {
      const urlClassInstance = new URL(url);
      urlClassInstance.searchParams.append('bust', String(Date.now()))
      _url = urlClassInstance.toString();
    }
    this.fabricCanvas?.clear();
    if (config?.group) {
      fabric.loadSVGFromURL(_url, svgObjects => {
        this.fabricCanvas?.add(new fabric.Group(svgObjects));
        this.taskStatus.onTaskFinish();
      });
    } else {
      fabric.loadSVGFromURL(_url, (svgObjects: FabricObject[]) => {
        svgObjects.forEach(obj => obj.id = UUID())
        const cloned = svgObjects.map(o => fabric.util.object.clone(o));
        const svgGroup = fabric.util.groupSVGElements(cloned) as fabric.Group;
        svgGroup.scaleToHeight(Number(this.fabricCanvas?.height));
        svgGroup.scaleToWidth(Number(this.fabricCanvas?.width));
        svgObjects.forEach(obj => {
          UtilsFabric.ScaleObject(obj, {
            cW: this.fabricCanvas?.width,
            cH: this.fabricCanvas?.height,
            oW: this.dimentions.width,
            oH: this.dimentions.height,
          });
          const gObj = svgGroup.getObjects().find((obj1: FabricObject) => obj1.id === obj.id) as fabric.Object;
          obj.scaleX = (obj.scaleX ?? 1) * (gObj.scaleX ?? 1);
          obj.scaleY = (obj.scaleY ?? 1) * (gObj.scaleY ?? 1);
          obj.setCoords();
          if (obj.type === 'text') {
            fabric.IText.fromObject(obj.toObject(), (itext: FabricObject) => {
              delete itext.type;
              this.fabricCanvas.add(itext);
            });
          } else {
            this.fabricCanvas?.add(obj);
          }
        });
        this.fabricCanvas?.renderAll();
        this.taskStatus.onTaskFinish();
      });
    }
  }

  public LoadElement(url: string): void {
    this.taskStatus.onTaskStart();


    fabric.loadSVGFromURL(url, svgObjects => {
      this.fabricCanvas?.add(new fabric.Group(svgObjects));
      this.taskStatus.onTaskFinish();
    });

  }
}