import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesAppUi, RoutesAsset } from '../../../config';

export function PageFailureUrl() {


    return (
        // <div>
        //     <div className="container-fluid">
        //         <div>
        //             <div className="gry-bg custom-shadow site-main-content-body">
        //                 <div>
        //                     <div className="row">
        //                         <div className="col-12">
        //                             <div className="px-4 pt-4 d-flex">
        //                                 <div className="d-flex site-border-bottom w-100 pb-2">
        //                                     <span className="my-auto flex-grow-1 h1">
        //                                         Seccess url
        //               </span>

        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>

        //             </div>
        //         </div>
        //     </div>
        //     <div>
        //         <h1>
        //             Your subscription request is successfull
        //                 </h1>
        //     </div>

        // </div>
        <div className="container-fluid">
        <div>
            <div className="custom-shadow">
                <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0">
                    <div className="gry-bg custom-shadow site-main-content-body md-border-radious">
                        <div className="row">
                            <div className="col-12">
                                <div className="py-3 px-3">
                                    <div>
                                        <div>
                                            <div>
                                                <div className="site-border-bottom py-2 mb-3">
                                                    <h2 className="mb-0 font-weight-bold blue-text">
                                                      Payment Failed!
                                                 </h2>
                                                </div>


                                                <div>


                                                    <div>
                                                        <div className="row flex-row flex-nowrap overflow-auto-hover pb-2">

                                                            <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-10 mx-auto">
                                                               <div className="paymetn-state-failed">
                                                                   <div className="payment-head">
                                                                       <span>
                                                                       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15 18.2609C12.5687 18.2609 10.2528 19.2907 8.64457 21.0868C8.40457 21.3554 8.42739 21.767 8.69544 22.0076C8.81935 22.1191 8.97522 22.1739 9.13044 22.1739C9.30913 22.1739 9.48783 22.1009 9.61631 21.9568C10.9774 20.4365 12.9398 19.5652 15 19.5652C17.0609 19.5652 19.0233 20.4365 20.3837 21.9568C20.6237 22.2254 21.0365 22.2476 21.3046 22.0076C21.5726 21.7676 21.5954 21.3554 21.3554 21.0868C19.7478 19.2913 17.432 18.2609 15 18.2609Z" fill="white"/>
                                                                    <path d="M15 0C6.72848 0 0 6.72913 0 15C0 23.2709 6.72848 30 15 30C23.2715 30 30 23.2709 30 15C30 6.72913 23.2715 0 15 0ZM15 28.6957C7.44848 28.6957 1.30435 22.5522 1.30435 15C1.30435 7.44783 7.44848 1.30435 15 1.30435C22.5515 1.30435 28.6957 7.44783 28.6957 15C28.6957 22.5522 22.5515 28.6957 15 28.6957Z" fill="white"/>
                                                                    <path d="M22.8261 10.4348C22.4654 10.4348 22.1739 10.727 22.1739 11.087C22.1739 12.1657 21.2961 13.0435 20.2174 13.0435C19.1387 13.0435 18.2609 12.1657 18.2609 11.087C18.2609 10.727 17.9694 10.4348 17.6087 10.4348C17.248 10.4348 16.9565 10.727 16.9565 11.087C16.9565 12.885 18.4194 14.3478 20.2174 14.3478C22.0154 14.3478 23.4783 12.885 23.4783 11.087C23.4783 10.727 23.1867 10.4348 22.8261 10.4348Z" fill="white"/>
                                                                    <path d="M13.0435 11.087C13.0435 10.727 12.752 10.4348 12.3913 10.4348C12.0307 10.4348 11.7391 10.727 11.7391 11.087C11.7391 12.1657 10.8613 13.0435 9.78261 13.0435C8.70392 13.0435 7.82609 12.1657 7.82609 11.087C7.82609 10.727 7.53457 10.4348 7.17392 10.4348C6.81327 10.4348 6.52174 10.727 6.52174 11.087C6.52174 12.885 7.98457 14.3478 9.78261 14.3478C11.5807 14.3478 13.0435 12.885 13.0435 11.087Z" fill="white"/>
                                                                    </svg>



                                                                       </span>
                                                                   </div>
                                                                   <div className="p-3">
                                                                       <h2 className="mb-3 font-weight-bold">Oooops!</h2>
                                                                       <p className="mb-0">Something's wrong</p>
                                                                       <p> The transaction could not complete. <br></br> Please try again</p>
                                                                   </div>
                                                                   <div></div>
                                                               </div>
                                                            </div>
                                                          
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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