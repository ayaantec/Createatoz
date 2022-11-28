import { toast } from "react-toastify";

export function GetFullUrl(route: string): string {
  return `${window.location.protocol}//${window.location.host}${route}`
}

export function DownloadFile(url: string, fileName: string): void {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  const toastId = toast('Downloading...', { autoClose: false });
  xhr.onload = function () {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
  }
  xhr.onerror = () => {
      toast.done(toastId);
      toast.error('Download Failed', { autoClose: 2000 });
  };
  xhr.onloadend = () => {
      toast.done(toastId);
      toast.success('Downloaded Successfully', { autoClose: 2000 });
  }
  xhr.onprogress = (e) => {
      const progress = e.loaded / e.total;
      toast.update(toastId, { autoClose: false, type: toast.TYPE.INFO, progress });
  }
  xhr.send();
}