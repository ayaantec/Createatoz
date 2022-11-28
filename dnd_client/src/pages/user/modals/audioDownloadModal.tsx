import React from 'react';
import { toast } from 'react-toastify';
import { DomID, RoutesAppApi } from '../../../config';
import { AxiosAuth, useSelectorTyped } from '../../../core';
import { BootstrapUtils, DownloadFile } from '../../../utils';

type Props = {
  audioUrl?: string;
  audioPropxyUrl?: string;
  audioName?: string;
  audiocosttype: number;
  audiopriceamount: number;
  audioID: string;
  audiouserID: boolean
  onClose?: () => void;
}

type PurchaseAudio = {
  currencyId: number,
  audioId: number,
}
const stripe = window.Stripe?.('pk_test_51IG0GPJW9pGptnmAOVJTQQk67siSFo4kZwZAmEG5NlgeJynXOvW5EtbMcdU7jQZtg8O6JUM04IPszwuDcRyc7iYq00ce9eUZU6');

function onpayment(vidID: string): void {
  const body: PurchaseAudio = {
    audioId: Number(vidID),
    currencyId: 1
  }
  AxiosAuth.post(RoutesAppApi.Audio.Purchase(), body,)
    .then(r => {
      if (r.status === 200) {
        BootstrapUtils.ModalHideById(DomID.Modals.ViewAudioDownload);
        toast.success('Please wait for payment request')
        stripe?.redirectToCheckout({
          sessionId: r.data
        })
        BootstrapUtils.ModalHideById(DomID.Modals.ViewAudioDownload);

      }
      BootstrapUtils.ModalHideById(DomID.Modals.ViewAudioDownload);

    }, () => {
      toast.error('')
    })
  BootstrapUtils.ModalHideById(DomID.Modals.ViewAudioDownload);

}

export function UserModalAudioDownload(props: Props): JSX.Element {
  const user = useSelectorTyped(state => state.user);
  const [showAudio, setShowAudio] = React.useState<boolean>(false);

  React.useEffect(() => {
    const onModalShow = () => setShowAudio(true);
    const onModalHide = () => setShowAudio(false);
    $(BootstrapUtils.GetSelectorById(DomID.Modals.ViewAudioDownload)).on('shown.bs.modal', onModalShow);
    $(BootstrapUtils.GetSelectorById(DomID.Modals.ViewAudioDownload)).on('hidden.bs.modal', onModalHide);
    return () => {
      $(BootstrapUtils.GetSelectorById(DomID.Modals.ViewAudioDownload)).off('hidden.bs.modal', onModalShow);
      $(BootstrapUtils.GetSelectorById(DomID.Modals.ViewAudioDownload)).off('hidden.bs.modal', onModalHide);
    }
  }, []);
  return (
    <div id={DomID.Modals.ViewAudioDownload} className="modal fade" tabIndex={-1} role="dialog" aria-hidden="true">
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
                    {showAudio && (
                      <audio controls>
                        <source src={props.audioUrl} />
                      </audio>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-8 col-md-12 col-sm-12 col-12">
                <div className="border-bottom pb-4">
                  <h3 className="font-weight-bold"> {props.audioName} </h3>

                  {props.audiocosttype === 0 ? (
                    <h3 className="font-weight-bold"> Free </h3>
                  ) : props.audiocosttype === 1 ? (
                    <div>
                      <h3 className="font-weight-bold"> Pro </h3>
                      <h3 className="font-weight-bold"> {props.audiopriceamount} </h3>
                    </div>
                  ) : props.audiocosttype === 2 ? (
                    <div>
                      <h3 className="font-weight-bold"> Enterprise </h3>
                      <h3 className="font-weight-bold"> {props.audiopriceamount} </h3>
                    </div>
                  ) : null}
                  <p className="gry-text">
                  </p>
                  <p className="gry-text"><span className="mr-2">You can download the audio while designing</span></p>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <>
                        {
                          user.profile?.package === 2 || (user.profile?.package === 1 && props.audiocosttype === 1) || props.audiocosttype === 0 ? (
                            <div>
                              {/* eslint-disable-next-line */}
                              <a href="javascript:void(0)"
                                className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3"
                                onClick={() => {
                                  if (user.isLoggedIn) {
                                    DownloadFile(props.audioUrl!, props.audioName!);
                                    BootstrapUtils.ModalHideById(DomID.Modals.ViewAudioDownload)
                                  } else {
                                    toast.warn("Please login to download.");
                                  }
                                }}
                              > Download</a>
                            </div>
                          ) : props.audiocosttype === 1 || props.audiocosttype === 2 ? (
                            <div>
                              {/* eslint-disable-next-line */}
                              <a href="javascript:void(0)"
                                className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3"
                                onClick={() => {
                                  if (user.isLoggedIn) {
                                    onpayment(props.audioID)
                                    BootstrapUtils.ModalHideById(DomID.Modals.ViewAudioDownload)
                                  } else {
                                    toast.warn("Please login first.");
                                  }
                                }}

                              > Buy</a>
                            </div>
                          ) : null
                        }
                      </>
                      {/* <div>
                       
                        <a href="javascript:void(0)"
                          className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3"
                          onClick={() => { DownloadFile(props.audioUrl!, props.audioName!); BootstrapUtils.ModalHideById(DomID.Modals.ViewAudioDownload) }}

                        > Download this Audio</a>
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