import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesAppUi, RoutesAsset } from '../../../config';
import { useHistory, useLocation } from 'react-router-dom';
import { DownloadFile } from '../../../utils';


export function PageSuccessUrl() {

    const currentUrl = window.location.href;
    const pathname = window.location.pathname
    console.log("current url : ", currentUrl)

    let urlElements = currentUrl.split('?')
    let urlElement = urlElements[0] + "     " + urlElements[1] + "     "
    console.log("urlElement", urlElement)

    const location = useLocation()
    console.log("urlElements[0]", urlElements[0])

    const history = useHistory()
    console.log("urlElements[1]", urlElements[1])
    let urlName = window.location.href.split('_')
    const downloadUrl = "https://d1ex8la5ufsmpr.cloudfront.net/api/Media/Item?" + urlElements[1]
    console.log("download url", downloadUrl)

    return (
        <>{
            // DownloadFile(downloadUrl,)
            urlElements[1] === undefined ? (
                null
            ) : DownloadFile(downloadUrl, urlName[2] || 'Drag&Drop File')

        }
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
                                                            <h2 className="mb-0 font-weight-bold blue-text ">
                                                                Payment Success!
                                                            </h2>
                                                        </div>


                                                        <div>


                                                            <div>
                                                                <div className="row flex-row flex-nowrap overflow-auto-hover pb-2">

                                                                    <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-10 mx-auto">
                                                                        <div className="paymetn-state-successfull">
                                                                            <div className="payment-head">
                                                                                <span>
                                                                                    <svg width="43" height="31" viewBox="0 0 43 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M41.7569 6.22229L18.0669 29.9116C17.3562 30.6223 16.4233 30.98 15.4903 30.98C14.5574 30.98 13.6244 30.6223 12.9137 29.9116L1.06908 18.0669C-0.35636 16.6422 -0.35636 14.3385 1.06908 12.9137C2.49386 11.4883 4.79685 11.4883 6.22229 12.9137L15.4903 22.1818L36.6037 1.06908C38.0285 -0.35636 40.3315 -0.35636 41.7569 1.06908C43.1817 2.49386 43.1817 4.79685 41.7569 6.22229V6.22229Z" fill="#FAFAFA" />
                                                                                    </svg>

                                                                                </span>
                                                                            </div>
                                                                            <div className="p-3">
                                                                                <h2 className="mb-3 font-weight-bold">Great!</h2>
                                                                                <p className="mb-0">Your payment is received!</p>
                                                                                <p> Now you can enjoy our exciting subscription.</p>
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
        </>
    );
}