import React from 'react';
import { DomID, RoutesAppApi } from '../../../config';
import { toast } from 'react-toastify';
import { BootstrapUtils, DownloadFile } from '../../../utils';
import { useFunctionalityOneTimePurchase } from '../secondaryPages/hooks'
import { AxiosAuth, useSelectorTyped } from '../../../core';
import { LoginModal } from './loginModal';

type Props = {
  fileUrl?: string;
  filename?: string;
  costtype: number;
  priceamount: number;
  onClose?: () => void;
  id: string;
  type: string;
  userID: boolean
}
type PurchaseImage = {
  currencyId: number,
  imageId: number,
}
const stripe = window.Stripe?.('pk_test_51IG0GPJW9pGptnmAOVJTQQk67siSFo4kZwZAmEG5NlgeJynXOvW5EtbMcdU7jQZtg8O6JUM04IPszwuDcRyc7iYq00ce9eUZU6');

function onpayment(imgID: string): void {
  const body: PurchaseImage = {
    imageId: Number(imgID),
    currencyId: 1
  }
  AxiosAuth.post(RoutesAppApi.Image.Purchase(), body,)
    .then(r => {
      if (r.status === 200) {
        BootstrapUtils.ModalHideById(DomID.Modals.ViewImageDownload);
        toast.success('Please wait for payment request')

        // imgUrl = r.data.fileUrl;
        // imgUrlProxy = r.data.fileUrlProxy;
        stripe?.redirectToCheckout({

          sessionId: r.data
        })
        BootstrapUtils.ModalHideById(DomID.Modals.ViewImageDownload);

      }
      BootstrapUtils.ModalHideById(DomID.Modals.ViewImageDownload);

    }, () => {
      toast.error('')
    })
  BootstrapUtils.ModalHideById(DomID.Modals.ViewImageDownload);

}


export function UserModalImageDownload(props: Props): JSX.Element {
  const user = useSelectorTyped(state => state.user);
  console.log(props.fileUrl, props.filename, "userid: ", props.userID)

  return (
    <div id={DomID.Modals.ViewImageDownload} className="modal fade" tabIndex={-1} role="dialog" aria-hidden="true">
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
                    <img className="img-fluid  sm-border-radious" src={props.fileUrl} alt="" />

                  </div>

                </div>
              </div>
              <div className="col-xl-4 col-lg-8 col-md-12 col-sm-12 col-12">
                <div className="border-bottom pb-4">
                  <h3 className="font-weight-bold"> {props.filename}  </h3>
                  {props.costtype === 0 ? (
                    <h3 className="font-weight-bold"> Free </h3>
                  ) : props.costtype === 1 ? (
                    <div>
                      <h3 className="font-weight-bold"> Pro </h3>
                      <h3 className="font-weight-bold"> {props.priceamount} </h3>
                    </div>
                  ) : props.costtype === 2 ? (
                    <div>
                      <h3 className="font-weight-bold"> Enterprise </h3>
                      <h3 className="font-weight-bold"> {props.priceamount} </h3>
                    </div>
                  ) : null}


                  <p className="gry-text">
                  </p>
                  <p className="gry-text"><span className="mr-2">You can download the File while designing</span></p>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      {
                        user.profile?.package === 2 || (user.profile?.package === 1 && props.costtype === 1) || props.costtype === 0 ? (

                          <div>
                            {/* eslint-disable-next-line */}
                            <a href="javascript:void(0)"
                              className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3"
                              onClick={() => {
                                if (user.isLoggedIn) {
                                  DownloadFile(props.fileUrl!, props.filename!);
                                  BootstrapUtils.ModalHideById(DomID.Modals.ViewImageDownload)
                                } else {
                                  toast.warn("Please login to download.");
                                }
                              }}
                            > Download {props.userID}</a>
                          </div>
                        ) : (props.costtype === 1 || props.costtype === 2) && props.userID ? (
                          <>

                            <div>
                              {/* eslint-disable-next-line */}
                              <a href="javascript:void(0)"
                                className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3"
                                onClick={() => {
                                  if (user.isLoggedIn) {
                                    onpayment(props.id);
                                    BootstrapUtils.ModalHideById(DomID.Modals.ViewImageDownload)
                                  } else {
                                    toast.warn("Please login first.");
                                  }
                                }}
                              > Buy</a>
                            </div>
                          </>
                        ) : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}