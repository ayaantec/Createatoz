import { fabric } from 'fabric';

const FabricAssetsDataURL = {
  Icon: {
    Clone: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#165fdb"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z"/></svg>')}`,
    Trash: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="red"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>')}`,
  },
};

const imgTrash = window.document.createElement('img');
const imgClone = window.document.createElement('img');

imgTrash.src = FabricAssetsDataURL.Icon.Trash;
imgClone.src = FabricAssetsDataURL.Icon.Clone;

function renderIcon(icon: any) {
  return function renderIcon(this: any, ctx: any, left: any, top: any, styleOverride: any, fabricObject: any) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size/2, -size/2, size, size);
    ctx.restore();
  }
}

function deleteObject(eventData: MouseEvent, target: fabric.Object) {
  var canvas = target.canvas;
      canvas?.getActiveObjects().forEach(obj => {
        canvas?.remove(obj);
      });
      canvas?.discardActiveObject();
      canvas?.requestRenderAll();
}

function cloneObject(eventData: MouseEvent, target: fabric.Object) {
  var canvas = target.canvas;
  target.clone(function(cloned: any) {
    cloned.left += 10;
    cloned.top += 10;
    canvas?.add(cloned);
  });
}

export function FabricInit(): void {
  (fabric.Object.prototype as any).controls.deleteControl = new (fabric as any).Control({
    x: 0.5,
    y: -0.5,
    offsetY: -20,
    offsetX: -30,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon(imgTrash),
    cornerSize: 24
  });
  
  (fabric.Object.prototype as any).controls.clone = new (fabric as any).Control({
    x: 0.5,
    y: -0.5,
    offsetY: -20,
    offsetX: -60,
    cursorStyle: 'pointer',
    mouseUpHandler: cloneObject,
    render: renderIcon(imgClone),
    cornerSize: 24
  });
  
  fabric.Object.prototype.set({
    borderColor: 'black',
    borderOpacityWhenMoving: 1,
    borderScaleFactor: 2,
    cornerColor: 'white',
    cornerSize: 15,
    cornerStrokeColor: 'black',
    cornerStyle: 'circle',
    padding: 10,
  });

  fabric.IText.prototype.set({
    editingBorderColor: 'black',
  })
};