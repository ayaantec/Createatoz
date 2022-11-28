const MimeType = {
  string: "text/plain",
  json: "application/json",
};

export class DataUrl {
  static fromString(str: string, base64: boolean = true): string {
    return base64
      ? `data:${MimeType.string};base64,${encodeURIComponent(
          btoa(
            unescape(
              // bota() can not process the UTF-8 escape
              encodeURIComponent(str) // charaters, so unescape() them beforehand
            )
          )
        )}`
      : `data:${MimeType.string};,${encodeURIComponent(str)}`;
  }

  static fromObject(obj: object, base64: boolean = true): string {
    return base64
      ? `data:${MimeType.json};base64,${encodeURIComponent(
          btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
        )}`
      : `data:${MimeType.json};,${encodeURIComponent(JSON.stringify(obj))}`;
  }
}

export class BlobUrl {
  static fromString(str: string): string {
    return URL.createObjectURL(new Blob([str], { type: MimeType.string }));
  }

  static fromObject(obj: object): string {
    return URL.createObjectURL(
      new Blob([JSON.stringify(obj)], { type: MimeType.json })
    );
  }
}

export const convertImgToBase64 = (url: string, callback: (dataUrl: string) => void, outputFormat?: string): void => {
  var img = new Image() as HTMLImageElement;

  img.crossOrigin = "Anonymous";

  img.onload = function () {
    var canvas = document.createElement("CANVAS") as HTMLCanvasElement;
    var ctx = canvas.getContext("2d");
    canvas.height = img.height;
    canvas.width = img.width;
    ctx?.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL(outputFormat || "image/png");
    callback(dataURL);
  };

  img.src = url;
};
