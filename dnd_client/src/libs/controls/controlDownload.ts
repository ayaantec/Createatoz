import { fabric } from 'fabric';
import jsPDF from 'jspdf';

export class FabricControlDownload {
  private readonly DefaultDownloadName = 'New Design';
  window: any;

  private triggerDownloadFromBlob(file: Blob, fileName?: string): void {
    var link = document.createElement("a");
    var objurl = URL.createObjectURL(file);
    link.download = fileName || this.DefaultDownloadName;
    link.href = objurl;
    link.click();
  }

  private dataURLtoBlob(dataurl: any): Blob {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  constructor(private fabricCanvas: fabric.Canvas) { }

  public DownloadSVG(fileName?: string): void {
    const svg = this.fabricCanvas?.toSVG();
    if (svg) {
      const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      this.triggerDownloadFromBlob(svgBlob, fileName);
    }
  }

  public DownloadPDF(fileName?: string): void {
    const imgData = this.fabricCanvas?.toDataURL({ format: "image/jpeg", quality: 1.0, multiplier: 1 });
    const height = this.fabricCanvas?.height;
    const width = this.fabricCanvas?.width;
    let pdf: jsPDF;
    if (width! > height!) {
      pdf = new jsPDF('l', 'px', [width!, height!]);
    }
    else {
      pdf = new jsPDF('p', 'px', [height!, width!]);
    }
    if (imgData) {
      pdf.addImage(imgData, 'JPEG', 0, 0, width!, height!, 'SLOW')
    }
    pdf.save(`${fileName || this.DefaultDownloadName}.pdf`);
  }

  public DownloadCanvasImage(downloadFormat: 'jpeg' | 'png', fileName?: string): void {
    var imgData = this.fabricCanvas?.toDataURL({
      format: downloadFormat, quality: 1,
      multiplier: 1,
    });
    var blob = this.dataURLtoBlob(imgData);
    this.triggerDownloadFromBlob(blob, fileName);
  }

 

  public DownloadVideo(file: Blob): void {
     var blob = new Blob([file] , {"type" : "video/mp4"})
    var link = document.createElement("a");
    var objurl = window.URL.createObjectURL(blob);
    let reader = new FileReader();
reader.readAsDataURL(file);
    link.download = this.DefaultDownloadName;
    // link.href = objurl;
    // link.click();
    reader.onload = function() {
      if(typeof(reader.result) === 'string')
      {
        link.href = reader.result; // data url
        link.click();
      }
     
    };
       link.click();
  }
}