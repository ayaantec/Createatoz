import React from 'react';
import { toast } from 'react-toastify';
import { DomID, RoutesAppApi } from '../../../config';
import { AxiosAuth, useSelectorTyped } from '../../../core';
import { BootstrapUtils, DownloadFile } from '../../../utils';

type Props = {
  videoUrl?: string;
  videoUrlProxy?: string;
  videoName?: string;
  videocosttype: number;
  videopriceamount: number;
  videoid: string;
  videouserID: boolean
  onClose?: () => void;
}

type PurchaseVideo = {
  currencyId: number,
  videoId: number,
}
const stripe = window.Stripe?.('pk_test_51IG0GPJW9pGptnmAOVJTQQk67siSFo4kZwZAmEG5NlgeJynXOvW5EtbMcdU7jQZtg8O6JUM04IPszwuDcRyc7iYq00ce9eUZU6');

function onpayment(vidID: string): void {
  const body: PurchaseVideo = {
    videoId: Number(vidID),
    currencyId: 1
  }
  AxiosAuth.post(RoutesAppApi.Video.Purchase(), body,)
    .then(r => {
      if (r.status === 200) {
        BootstrapUtils.ModalHideById(DomID.Modals.ViewVideoDownload);
        toast.success('Please wait for payment request')
        stripe?.redirectToCheckout({
          sessionId: r.data
        })
        BootstrapUtils.ModalHideById(DomID.Modals.ViewVideoDownload);

      }
      BootstrapUtils.ModalHideById(DomID.Modals.ViewVideoDownload);

    }, () => {
      toast.error('')
    })
  BootstrapUtils.ModalHideById(DomID.Modals.ViewVideoDownload);

}

export function UserModalVideoDownload(props: Props): JSX.Element {
  const user = useSelectorTyped(state => state.user);
  const [showVideo, setShowVideo] = React.useState<boolean>(false);

  React.useEffect(() => {
    const onModalShow = () => setShowVideo(true);
    const onModalHide = () => setShowVideo(false);
    $(BootstrapUtils.GetSelectorById(DomID.Modals.ViewVideoDownload)).on('shown.bs.modal', onModalShow);
    $(BootstrapUtils.GetSelectorById(DomID.Modals.ViewVideoDownload)).on('hidden.bs.modal', onModalHide);
    return () => {
      $(BootstrapUtils.GetSelectorById(DomID.Modals.ViewVideoDownload)).off('hidden.bs.modal', onModalShow);
      $(BootstrapUtils.GetSelectorById(DomID.Modals.ViewVideoDownload)).off('hidden.bs.modal', onModalHide);
    }
  }, []);

  console.log(props.videoUrl, props.videoName, "userid: ", props.videouserID)

  return (
    <div id={DomID.Modals.ViewVideoDownload} className="modal fade" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-lg site-modal-custom  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 pb-xl-0 pb-lg-0 pb-mb-3 pb-sm-3 pb-3">
                <div className="popup-content-area d-flex">
                  <div className="m-auto popup-content-single">
                    {showVideo && (
                      <video loop muted autoPlay>
                        <source src={props.videoUrl} />
                      </video>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-8 col-md-12 col-sm-12 col-12">
                <div className="border-bottom pb-4">
                  <h3 className="font-weight-bold"> {props.videoName} </h3>
                  {props.videocosttype === 0 ? (
                    <h3 className="font-weight-bold"> Free </h3>
                  ) : props.videocosttype === 1 ? (
                    <div>
                      <h3 className="font-weight-bold"> Pro </h3>
                      <h3 className="font-weight-bold"> {props.videopriceamount} </h3>
                    </div>
                  ) : props.videocosttype === 2 ? (
                    <div>
                      <h3 className="font-weight-bold"> Enterprise </h3>
                      <h3 className="font-weight-bold"> {props.videopriceamount} </h3>
                    </div>
                  ) : null}
                  <p className="gry-text">
                  </p>
                  <p className="gry-text"><span className="mr-2">You can download the video while designing</span></p>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      {
                        user.profile?.package === 2 || (user.profile?.package === 1 && props.videocosttype === 1) || props.videocosttype === 0 ? (
                          <div>
                            {/* eslint-disable-next-line */}
                            <a href="javascript:void(0)"
                              className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3"
                              onClick={() => {
                                if (user.isLoggedIn && props.videoUrlProxy) {
                                  DownloadFile(props.videoUrlProxy, props.videoName || 'Drag&Drop Video');
                                  BootstrapUtils.ModalHideById(DomID.Modals.ViewVideoDownload);
                                } else {
                                  toast.warn("Please login to download");
                                }
                              }}
                            > Download</a>
                          </div>
                        ) : (props.videocosttype === 1 || props.videocosttype === 2) ? (
                          <div>
                            {/* eslint-disable-next-line */}
                            <a href="javascript:void(0)"
                              className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3"
                              onClick={() => {
                                if (user.isLoggedIn && props.videoUrlProxy) {
                                  onpayment(props.videoid)
                                  BootstrapUtils.ModalHideById(DomID.Modals.ViewVideoDownload);
                                } else {
                                  toast.warn("Please login to download");
                                }
                              }}
                            > Buy</a>
                          </div>
                        ) : null
                      }


                      {/* <div>
                        <a href="javascript:void(0)"
                          className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3"
                          onClick={() => {
                            if (props.videoUrlProxy) {
                              DownloadFile(props.videoUrlProxy, props.videoName || 'Drag&Drop Video');
                            }
                            BootstrapUtils.ModalHideById(DomID.Modals.ViewVideoDownload);
                          }}
                        > Download this Video</a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}