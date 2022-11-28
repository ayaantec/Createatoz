import React from 'react';
import { AssetsSvg } from '../../../assets';
import { Spinner } from '../../../common';
import { FabricStateContext } from '../designPage';
import axios, { Canceler as AxiosCanceler } from 'axios';
import { AxiosAuth, useSelectorTyped } from '../../../core';
import { Packages, RoutesAppApi, RoutesAppUi } from '../../../config';
import { toast } from 'react-toastify';

export function DesignDownload(): JSX.Element {
  const cancelToken = React.useRef<AxiosCanceler>();
  const fabricState = React.useContext(FabricStateContext);
  const designId = RoutesAppUi.Design.WithTemplate.useParam();
  const designName = useSelectorTyped(state => state.design.currentDesignName);
  const packageId = useSelectorTyped(state => state.user.profile?.package);
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);
  const downloadVideo = React.useCallback(() => {
    if (typeof designId !== 'string') return;
    setIsDownloading(true);
    cancelToken.current?.();
    AxiosAuth.post<Blob>(
      RoutesAppApi.Video.CreateVideoFromDesign(),
      { designId },
      {
        cancelToken: new axios.CancelToken(c => cancelToken.current = c),
        transformResponse: undefined,
        responseType: 'blob',
      },
    ).then(res => {
      if (res.status === 200) {
        // fabricState.ControlDownload?.DownloadVideo(res.data);
        console.log("res", res.data)
        fabricState.ControlDownload?.DownloadVideo(res.data)

      }
      setIsDownloading(false);
    }).catch(() => {
      setIsDownloading(false);
      toast.error('Video Download Failed');

    });
  }, [designId, fabricState.ControlDownload]);
  return (
    <div className="d-flex">
      {/* eslint-disable-next-line */}
      <a href="javascript:void(0)">
        <div className="p-2 ctl-icons d-flex align-items-center">


          {
            // isDownloading ?
            // (
            //   <>
            //     <a href="javascript:void(0)">
            //       <div className="p-2 ctl-icons d-flex">
            //         <div>
            //           <Spinner />
            //         </div>
            //       </div>
            //     </a>
            //   </>

            // ) :
            (
              <>
                {/* eslint-disable-next-line */}
                <a href="javascript:void(0)" className="d-flex px-xl-2 px-lg-2 px-md-2 px-sm-0 px-0" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                  <div className="cur-point my-auto">
                    <AssetsSvg.Download />
                  </div>
                  <p className="my-auto ml-2 d-xl-block d-lg-block d-md-block d-sm-none d-none">Download</p>

                  <div className="p-2 ctl-icons d-flex">
                    <div>
                      <AssetsSvg.Options />
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {/* eslint-disable-next-line */}
                  <a className="dropdown-item text-uppercase" href="javascript:void(0)" onClick={() => fabricState.ControlDownload?.DownloadPDF(designName)} >Pdf</a>
                  {/* eslint-disable-next-line */}
                  <a className="dropdown-item text-uppercase" href="javascript:void(0)" onClick={() => fabricState.ControlDownload?.DownloadCanvasImage('png', designName)}>Png</a>
                  {/* eslint-disable-next-line */}
                  <a className="dropdown-item text-uppercase" href="javascript:void(0)" onClick={() => fabricState.ControlDownload?.DownloadCanvasImage('jpeg', designName)}>Jpeg</a>
                  {/* eslint-disable-next-line */}
                  {packageId === Packages.Pro || packageId === Packages.Enterprise ? (<a className="dropdown-item text-uppercase" href="javascript:void(0)" onClick={() => fabricState.ControlDownload?.DownloadSVG(designName)}>SVG</a>) : null}
                  {/* eslint-disable-next-line */}
                  <a className="dropdown-item text-uppercase" href="javascript:void(0)" onClick={downloadVideo}>Mp4</a>
                </div>
                {
                  isDownloading ?
                    (
                      <>
                        <a href="javascript:void(0)">
                          <div className="p-2 ctl-icons d-flex">
                            <div>
                              <Spinner />
                            </div>
                            <div>Downloading...</div>
                          </div>
                        </a>
                      </>
                    ) : null
                }
              </>
            )}
        </div>
      </a>
    </div>
  );
}