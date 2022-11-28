import React from 'react';
import { DomID, RoutesAsset } from '../../../config';
import { Spinner } from '../../../common';
import { BootstrapUtils } from '../../../utils';
import { useFunctionalityPricing, useFunctionalityResetPassword } from '../secondaryPages/hooks';
import { useFunctionalityPurchasePlan } from '../secondaryPages/hooks/functionalityPurchasePlan';
import StripeCheckout from 'react-stripe-checkout'
import { Token } from 'typescript';
import { AssetsPng, AssetsSvg } from '../../../assets';
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { ElementsConsumer, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

type Props = {
    userType: string,

}



export function PurchasePlanModal(props: Props): JSX.Element {

    const {
        state,
        stateDispatch,
        onPayment,
        setAmount,
        setBillType
    } = useFunctionalityPurchasePlan();
    console.log("session id in modal: ", state.sessionid)

    const {
        pricingData
    } = useFunctionalityPricing();

    return (
        <div className="modal fade" id={DomID.Modals.PurchasePlan} tabIndex={-1} role="dialog" aria-labelledby="purchase-plan-modalTitle" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered site-modal-login" role="document">
                <div className="modal-content py-3">
                    <div className="modal-header mx-4">
                        <h3 className="modal-title m-auto font-weight-bold" id="login-modalTitle">Purchase Your Plan !</h3>
                    </div>

                    {/*  */}

                    <div className="modal-body p-0 pt-3 px-4 ">
                        <div className="py-2">
                            <div className="input-group-prepend text-center d-block">
                                <p> Payments for {props.userType} Plan</p>

                            </div>

                        </div>

                        <React.Fragment>
                            <div className="py-3">
                                <div className="row">
                                    <div className="col-6 price-payment-ctl mx-auto">
                                        <div className="form-check mr-3">
                                            <div className="p-3">
                                                {
                                                    props.userType === 'Pro' ? (
                                                        <label className="form-check-label" htmlFor="radio1" >

                                                            <input type="radio" className="form-check-input" id="radio1" name="optradio" defaultValue="Monthly" checked={state.billType === 'Monthly'} value={'Monthly'} onClick={() => { setBillType('Monthly'); setAmount('12.95') }} />


                                                    Monthly
                                                        </label>
                                                    ) : props.userType === 'Enterprize' ? (
                                                        <label className="form-check-label" htmlFor="radio1" >

                                                            <input type="radio" className="form-check-input" id="radio1" name="optradio" defaultValue="Monthly" checked={state.billType === 'Monthly'} value={'Monthly'} onClick={() => { setBillType('Monthly'); setAmount('20') }} />Monthly
                                                        </label>
                                                    ) : null

                                                }
                                                <span className="d-block mt-2">
                                                    <svg width="44" height="auto" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18.1677 0.921713C18.1677 0.409723 18.6727 0 19.3011 0C19.9295 0 20.4348 0.418482 20.4348 0.921713V4.97274C20.4348 5.48516 19.9293 5.89467 19.3011 5.89467C18.6729 5.89467 18.1677 5.47838 18.1677 4.97274V0.921713ZM6.51857 0.921713C6.51857 0.409504 7.02394 0 7.65235 0C8.28077 0 8.78613 0.418482 8.78613 0.921713V4.97274C8.78613 5.48516 8.28077 5.89467 7.65235 5.89467C7.02394 5.89467 6.51857 5.47838 6.51857 4.97274V0.921713V0.921713ZM1.48534 23.926C1.48534 24.0817 1.54686 24.2306 1.65211 24.3357C1.75736 24.4408 1.89601 24.4999 2.06322 24.4999H24.9216C25.0774 24.4999 25.2268 24.4388 25.3297 24.3357C25.4356 24.2306 25.4949 24.0924 25.4949 23.926C25.4949 17.601 25.4949 10.7616 25.4949 4.43622C25.4949 4.27877 25.4331 4.13183 25.3297 4.0357C25.2244 3.93058 25.086 3.87124 24.9302 3.87124H23.0999C22.7505 3.87124 22.4717 3.35662 22.4717 3.00865C22.4717 2.66068 22.7507 2.38235 23.0999 2.38235H25.1675C25.6726 2.38235 26.1275 2.59061 26.4593 2.92084C26.791 3.25151 27 3.71138 27 4.20848V24.1732C27 24.6767 26.791 25.13 26.4593 25.4606C26.1275 25.7917 25.6663 25.9996 25.1675 25.9996H1.8325C1.32714 25.9996 0.872307 25.7917 0.540523 25.4606C0.208958 25.1304 0 24.6705 0 24.1737V4.20869C0 3.70503 0.208958 3.25172 0.540303 2.92106C0.872088 2.59061 1.33373 2.38257 1.83228 2.38257H4.04909C4.39823 2.38257 4.6775 2.66046 4.6775 3.00887C4.6775 3.35684 4.39823 3.87146 4.04909 3.87146H2.07157C1.91578 3.87146 1.76615 3.93277 1.6609 4.03591C1.55543 4.14081 1.49369 4.28118 1.49369 4.4452C1.49391 10.7535 1.48534 17.5903 1.48534 23.926ZM11.3257 3.86248C10.9766 3.86248 10.6973 3.34808 10.6973 2.99989C10.6973 2.65192 10.9766 2.37381 11.3257 2.37381H15.5484C15.8982 2.37381 16.1766 2.65214 16.1766 2.99989C16.1766 3.3483 15.898 3.86291 15.5484 3.86291L11.3257 3.86248Z" fill="#00AB86" />
                                                        <path d="M15.0641 6.39418V14.7824H12.8273V9.17048C12.4656 9.44268 12.115 9.66145 11.7755 9.82875C11.4365 9.99606 11.0113 10.1577 10.5015 10.3105V8.52338C11.2543 8.28096 11.8405 7.99015 12.2558 7.65203C12.6731 7.31195 12.9996 6.89281 13.2351 6.3944H15.0641V6.39418Z" fill="#00AB86" />
                                                        <path d="M7.83385 16.6681V22.0858H6.5133L6.50935 18.4286L5.98486 22.0858H5.06048L4.50656 18.5107L4.50304 22.0858H3.1825V16.6681H5.13277C5.1877 16.9957 5.24769 17.3816 5.31229 17.8224L5.5263 19.1979L5.86995 16.6679H7.83385V16.6681ZM12.0198 19.8439C12.0198 20.3883 12.0062 20.7732 11.9785 20.999C11.9517 21.2261 11.866 21.433 11.7217 21.6205C11.5773 21.8075 11.3815 21.9512 11.1359 22.0517C10.89 22.1522 10.6041 22.2023 10.2778 22.2023C9.96716 22.2023 9.68942 22.1548 9.44245 22.06C9.19526 21.965 8.99619 21.8235 8.847 21.6341C8.69649 21.4447 8.6075 21.2379 8.57806 21.0157C8.54993 20.7921 8.53543 20.4014 8.53543 19.8441V18.9173C8.53543 18.3729 8.54883 17.9884 8.57696 17.7622C8.60398 17.5351 8.68924 17.3286 8.83338 17.1411C8.97774 16.9539 9.17329 16.81 9.41916 16.7095C9.66503 16.609 9.95112 16.5589 10.2776 16.5589C10.5881 16.5589 10.8654 16.6068 11.1126 16.7012C11.3596 16.7962 11.5586 16.9377 11.708 17.1271C11.8583 17.3165 11.9473 17.5233 11.9768 17.746C12.0051 17.9696 12.0196 18.3598 12.0196 18.9171V19.8439H12.0198ZM10.5088 18.0642C10.5088 17.8132 10.4938 17.6523 10.4644 17.5817C10.4352 17.5117 10.3754 17.4766 10.2847 17.4766C10.2078 17.4766 10.1489 17.5049 10.1073 17.5622C10.0671 17.6183 10.0465 17.7858 10.0465 18.0644V20.593C10.0465 20.907 10.0599 21.1011 10.0867 21.1742C10.1137 21.2482 10.1757 21.2846 10.2737 21.2846C10.3741 21.2846 10.4389 21.2427 10.467 21.1584C10.4952 21.0737 10.5088 20.8713 10.5088 20.5532V18.0642ZM16.0918 16.6681V22.0858H14.7712L13.9864 19.6223V22.0858H12.7249V16.6681H13.9864L14.8301 19.1079V16.6681H16.0918ZM19.8721 16.6681V17.7501H18.9842V22.0858H17.4732V17.7504H16.578V16.6683H19.8721V16.6681ZM23.8171 16.6681V22.0858H22.306V19.8123H21.8657V22.0861H20.3546V16.6683H21.8657V18.6068H22.306V16.6683H23.8171V16.6681Z" fill="#D8453E" />
                                                    </svg>



                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    {/* <div className="col-6  price-payment-ctl">

                                        <div className="form-check mr-3">
                                            <div className="p-3">
                                                {
                                                    props.userType === 'Pro' ? (
                                                        <label className="form-check-label" htmlFor="radio1">
                                                            <input type="radio" className="form-check-input" id="radio1" name="optradio" defaultValue="Monthly" checked={state.billType === 'Yearly'} value={'Yearly'} onClick={() => { setBillType('Yearly'); setAmount('148.93') }} />Yearly
                                                        </label>
                                                    ) : props.userType === 'Enterprize' ? (
                                                        <label className="form-check-label" htmlFor="radio1">
                                                            <input type="radio" className="form-check-input" id="radio1" name="optradio" defaultValue="Monthly" checked={state.billType === 'Yearly'} value={'Yearly'} onClick={() => { setBillType('Yearly'); setAmount('161') }} />Yearly
                                                        </label>
                                                    ) : null
                                                }
                                                <span className="d-block mt-2">
                                                    <svg width="44" height="auto" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0)">
                                                            <path d="M16.7129 0.851006C16.7129 0.378001 17.1778 0 17.7559 0C18.334 0 18.799 0.386086 18.799 0.851006V4.59058C18.799 5.06359 18.334 5.44159 17.7559 5.44159C17.1778 5.44159 16.7129 5.05753 16.7129 4.59058V0.851006ZM5.99747 0.851006C5.99747 0.378001 6.46239 0 7.04051 0C7.61863 0 8.08355 0.386086 8.08355 0.851006V4.59058C8.08355 5.06359 7.61863 5.44159 7.04051 5.44159C6.46239 5.44159 5.99747 5.05753 5.99747 4.59058V0.851006V0.851006ZM1.36646 22.0857C1.36646 22.2293 1.42306 22.3667 1.52009 22.4637C1.61711 22.5608 1.74446 22.6153 1.89809 22.6153H22.9266C23.0702 22.6153 23.2076 22.5587 23.3026 22.4637C23.3996 22.3667 23.4542 22.2394 23.4542 22.0857C23.4542 16.248 23.4542 9.93313 23.4542 4.09534C23.4542 3.9498 23.3976 3.81437 23.3026 3.72543C23.2056 3.6284 23.0782 3.57382 22.9347 3.57382H21.2509C20.9295 3.57382 20.6728 3.0988 20.6728 2.77739C20.6728 2.45599 20.9295 2.19928 21.2509 2.19928H23.153C23.618 2.19928 24.0364 2.39131 24.3416 2.69654C24.6468 3.00177 24.8389 3.42626 24.8389 3.88512V22.3142C24.8389 22.7791 24.6468 23.1975 24.3416 23.5027C24.0364 23.808 23.6119 24 23.153 24H1.68584C1.22092 24 0.802493 23.808 0.497263 23.5027C0.192032 23.1975 0 22.773 0 22.3142V3.88512C0 3.4202 0.192032 3.00177 0.497263 2.69654C0.802493 2.39131 1.22699 2.19928 1.68584 2.19928H3.72543C4.04683 2.19928 4.30355 2.45599 4.30355 2.77739C4.30355 3.0988 4.04683 3.57382 3.72543 3.57382H1.90617C1.76265 3.57382 1.6252 3.63042 1.52817 3.72543C1.43115 3.82245 1.37455 3.95182 1.37455 4.10343C1.37455 9.92706 1.36646 16.2379 1.36646 22.0857ZM10.4203 3.56574C10.0989 3.56574 9.84216 3.09071 9.84216 2.76931C9.84216 2.44791 10.0989 2.19119 10.4203 2.19119H14.3054C14.6268 2.19119 14.8835 2.44791 14.8835 2.76931C14.8835 3.09071 14.6268 3.56574 14.3054 3.56574H10.4203Z" fill="#00AB86" />
                                                            <path d="M14.1538 5.79736V13.5191H11.997V8.46762C11.6473 8.72838 11.3097 8.9386 10.9822 9.10031C10.6548 9.26202 10.2444 9.41767 9.75322 9.56321V7.84503C10.4789 7.61257 11.0449 7.33159 11.4451 7.00817C11.8474 6.6807 12.1627 6.27845 12.3891 5.79938H14.1538V5.79736Z" fill="#00AB86" />
                                                            <path d="M8.68188 15.3161L7.60448 18.9445V21.0023H6.23802V18.9425L5.19498 15.3161H6.55133C6.76156 16.4299 6.88284 17.1758 6.91114 17.5598C6.99604 16.9534 7.13349 16.2055 7.3235 15.3161H8.68188ZM9.14276 15.3161H11.6089V16.4521H10.6244V17.5376H11.5442V18.615H10.6244V19.8662H11.7099V21.0023H9.14276V15.3161ZM14.9381 15.3161L15.783 21.0023H14.2731L14.1922 19.9815H13.6586L13.5777 21.0023H12.0475L12.7974 15.3161H14.9381ZM14.1538 18.9748C14.083 18.33 14.0083 17.5315 13.9294 16.5795C13.7839 17.673 13.6909 18.4695 13.6505 18.9748H14.1538ZM16.2459 15.3161H17.291C17.9884 15.3161 18.4594 15.3424 18.708 15.3969C18.9546 15.4515 19.1567 15.589 19.3124 15.8093C19.468 16.0296 19.5469 16.3834 19.5469 16.8665C19.5469 17.3092 19.4903 17.6063 19.3811 17.7579C19.272 17.9095 19.0557 18.0005 18.7322 18.0308C19.0254 18.1036 19.2234 18.2026 19.3225 18.3239C19.4215 18.4452 19.4862 18.5584 19.5085 18.6595C19.5327 18.7605 19.5448 19.0435 19.5448 19.5004V21.0023H18.239V19.1102C18.239 18.805 18.2127 18.617 18.1663 18.5443C18.1198 18.4715 17.7579 18.4351 17.5558 18.4351V21.0002H16.2439V15.3161H16.2459ZM17.5578 16.2864V17.5518C17.7236 17.5518 18.0753 17.5295 18.142 17.483C18.2087 17.4365 18.241 17.289 18.241 17.0383V16.725C18.241 16.5451 18.2087 16.4238 18.146 16.3692C18.0834 16.3147 17.7276 16.2864 17.5578 16.2864Z" fill="#D8453E" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width="24.8389" height="24" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                </span>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>


                            </div>

                        </React.Fragment>
                        <div className="py-3 text-center site-border-bottom">

                            {
                                state.billType === '' || state.billType === 'Monthly' ? (
                                    props.userType === 'Enterprize' ? (
                                        <h2 className="mb-0 font-weight-bold font-blue-text font-size-22" >
                                            Total Amount :
                                            {
                                                pricingData.map(data => (
                                                    <span className="larg-text mx-2">${data.enterprise}</span>
                                                ))
                                            }
                                            {/* Total Amount : $20 */}
                                        </h2>

                                    ) : props.userType === 'Pro' ? (
                                        <h2 className="mb-0 font-weight-bold font-blue-text font-size-22" > Total Amount :
                                            {
                                                pricingData.map(data => (
                                                    <span className="larg-text mx-2">${data.pro}</span>
                                                ))
                                            }
                                            {/* $12.95 */}
                                        </h2>

                                    ) : null


                                ) :
                                    <h2 className="mb-0 font-weight-bold font-blue-text font-size-22" > Total Amount : {state.amount} </h2>

                            }

                        </div>
                        <div className="d-flex pt-3">

                            <div className="alert alert-danger mt-2 text-center" role="alert">
                                Please click on proceed or cancel button to continue
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a className="secondary-btn-link px-3 py-2  text-center" href="javascript:void(0)" data-dismiss="modal"> Cancel</a>

                        <div>

                            <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={state.isBusy ? undefined : () => onPayment(props.userType)}>
                                {state.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Proceed'}
                            </a>
                            {

                            }
                        </div>
                    </div>

                    {/*  */}
                </div>
            </div>
        </div>
    );
}