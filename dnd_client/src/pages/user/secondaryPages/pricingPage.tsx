import React from 'react';
import { Link } from 'react-router-dom';
import StateManager from 'react-select';
import { AssetsSvg } from '../../../assets';
import { DomID, RoutesAppApi, RoutesAppUi } from '../../../config';
import { AxiosAuth } from '../../../core';
import { PricingTextForApi, PricingText } from '../../../models/pricing';
import { BootstrapUtils } from '../../../utils';
import { PasswordResetModal, PurchasePlanModal } from '../modals';
import { useFunctionalityPricing } from './hooks';
import { useFunctionalityPurchasePlan } from './hooks/functionalityPurchasePlan';

export function PagePricing(): JSX.Element {
  const {
    pricingData
  } = useFunctionalityPricing();
  const { state, setUerType } = useFunctionalityPurchasePlan();

  const [pricingPackageTexts, setpricingPackageTexts] = React.useState<PricingText[]>([])


  React.useEffect(() => {
    AxiosAuth.get<PricingTextForApi[]>(RoutesAppApi.Pricing.GetAllPackageContent())
      .then((r) => {
        const pricingTexts = r.data.map(element => {
          const pricingText: PricingText = {
            packageId: element.packageId,
            packageName: element.packageName,
            packageDescriptions: JSON.parse(element.packageDescriptions)
          };
          return pricingText;
        });
        setpricingPackageTexts(pricingTexts.sort((a, b) => ((+a.packageId) - (+b.packageId))))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <PurchasePlanModal userType={state.usertype} />
      <div className="container-fluid">
        <div>
          <div className="custom-shadow site-main-content-body">
            <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0">
              <div className="md-border-radious overflow-hidden gry-bg">
                <div className="row">
                  <div className="col-12">
                    <div className="py-3 px-3">
                      <div>
                        <div>
                          <div>
                            <div className="site-border-bottom py-2 mb-3">
                              <h2 className="mb-0 font-weight-bold blue-text">Explore CreateA2Z Pricings</h2>
                            </div>
                            <div className="price-table">
                              <table className="table">
                                <thead className="borderlesstablehead">
                                  <tr>
                                    <th scope="col"></th>
                                    <th scope="col" ></th>
                                    <th scope="col" className="text-center pro-table">Best Value</th>
                                    <th scope="col"></th>
                                  </tr>
                                </thead>

                                <thead className="white-bg">
                                  <tr>
                                    <th scope="col">Plans</th>
                                    <th scope="col" >Free</th>
                                    <th scope="col">
                                      <span className="mr-3">
                                        < AssetsSvg.ProAccountIcon />
                                      </span>Pro
                                    </th>
                                    <th scope="col">Enterprise</th>
                                  </tr>
                                </thead>
                                <tbody className="white-bg">
                                  <tr>
                                  <th scope="row">Monthly price</th>
                                    {pricingPackageTexts ? pricingPackageTexts.map((ptext) => {
                                      return <td
                                      // onClick={() => {
                                      // setOpenEditor(false)
                                      // onPackageClick(ptext.packageId, ptext.packageName, ptext.packageDescriptions.monthly_price, "monthly", ptext)
                                      // }}
                                      >
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: ptext.packageDescriptions.monthly_price,
                                          }}
                                        />
                                      </td>
                                    })
                                      : <td></td>}
                                  </tr>

                                  <tr>
                                    <th scope="row">Top Features</th>
                                    {pricingPackageTexts ? pricingPackageTexts.map((ptext) => {
                                      return <td 
                                      // onClick={() => {
                                      //   setOpenEditor(false)
                                      //   onPackageClick(ptext.packageId, ptext.packageName, ptext.packageDescriptions.top_features, "topFeature", ptext)
                                      // }}
                                      >
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: ptext.packageDescriptions.top_features,
                                          }}
                                        />
                                      </td>
                                    })
                                      : <td></td>}
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">

                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        {/* <a
                                        className="site-primary-btn px-3 py-2 text-center cur-point"
                                        href="javascript:void(0)"
                                        onClick={() => {
                                          RoutesAppUi.Home.Root
                                        }}
                                      > Currently using this </a> */}
                                        <Link to={RoutesAppUi.Home.Root} className="site-btn-green-ctl px-3 py-2 text-center cur-point d-flex mx-auto"
                                          href="javascript:void(0)">
                                          <span className="mr-2">
                                            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M14.799 2.20523L6.40307 10.6009C6.15118 10.8528 5.82054 10.9796 5.4899 10.9796C5.15926 10.9796 4.82861 10.8528 4.57673 10.6009L0.378891 6.40307C-0.126297 5.89812 -0.126297 5.08168 0.378891 4.57673C0.883842 4.07154 1.70004 4.07154 2.20523 4.57673L5.4899 7.8614L12.9726 0.378891C13.4776 -0.126297 14.2938 -0.126297 14.799 0.378891C15.3039 0.883842 15.3039 1.70004 14.799 2.20523Z" fill="#FAFAFA" />
                                            </svg>
                                          </span>
                                          Currently using this
                                        </Link>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex" onClick={() => setUerType("Pro")}>
                                        <a
                                          className="site-primary-btn-yellow px-3 py-2 text-center cur-point mx-auto d-flex"
                                          href="javascript:void(0)"
                                          data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.PurchasePlan)}
                                        // onClick={() => {
                                        //   if (apiTemplatesData?.subCatagory) {
                                        //     createDesignWithoutTemplate(
                                        //       apiTemplatesData.subCatagory.width,
                                        //       apiTemplatesData.subCatagory.height,
                                        //       apiTemplatesData.subCatagory.id,
                                        //     );
                                        //   }
                                        // }}
                                        >
                                          <span className="mr-2">
                                            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M18.68 2.17C17.96 2.17 17.37 2.76 17.37 3.48C17.37 3.76 17.46 4.03 17.62 4.24L13.4 6.93L10.48 2.54C10.97 2.35 11.32 1.88 11.32 1.32C11.31 0.59 10.72 0 10 0C9.28 0 8.69 0.59 8.69 1.31C8.69 1.87 9.04 2.34 9.53 2.53L6.57 6.97L2.37 4.25C2.52 4.03 2.62 3.77 2.62 3.49C2.62 2.77 2.03 2.18 1.31 2.18C0.59 2.18 0 2.76 0 3.48C0 4.2 0.59 4.8 1.31 4.8C1.45 4.8 1.58 4.77 1.7 4.73L4.91 9.82C4.98 9.93 5.11 10.01 5.24 10.01H14.74C14.88 10.01 15 9.94 15.07 9.82L18.28 4.73C18.41 4.77 18.54 4.8 18.67 4.8C19.41 4.8 20 4.21 20 3.48C20 2.75 19.41 2.17 18.68 2.17ZM10 0.79C10.29 0.79 10.52 1.03 10.52 1.31C10.52 1.6 10.28 1.83 10 1.83C9.72 1.83 9.48 1.6 9.48 1.31C9.47 1.03 9.71 0.79 10 0.79ZM0.79 3.48C0.79 3.19 1.02 2.96 1.31 2.96C1.6 2.96 1.84 3.2 1.84 3.48C1.84 3.77 1.61 4 1.32 4C1.02 4.01 0.79 3.77 0.79 3.48ZM14.53 9.22H5.46L3.3 5.79L6.47 7.84C6.65 7.96 6.9 7.91 7.01 7.73L10 3.24L12.95 7.68C13.07 7.86 13.31 7.91 13.49 7.8L16.71 5.75L14.53 9.22ZM18.68 4.01C18.39 4.01 18.16 3.78 18.16 3.49C18.16 3.2 18.39 2.97 18.68 2.97C18.97 2.97 19.2 3.21 19.2 3.49C19.21 3.77 18.97 4.01 18.68 4.01ZM15.18 11.24C15.18 11.46 15 11.63 14.79 11.63H5.21C4.99 11.63 4.82 11.45 4.82 11.24C4.82 11.02 5 10.85 5.21 10.85H14.78C15 10.85 15.18 11.03 15.18 11.24Z" fill="white" />
                                            </svg>

                                          </span>
                                          Get Pro plan Now ! </a>
                                        {/* <PurchasePlanModal userType="Pro" userType1="" /> */}

                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex" onClick={() => setUerType("Enterprize")}>
                                        <a
                                          className="site-primary-btn px-3 py-2 text-center cur-point mx-auto d-flex"
                                          href="javascript:void(0)"
                                          data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.PurchasePlan)}


                                        >
                                          <span className="mr-2">
                                            <svg width="15" height="auto" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M10.7261 4.58186C10.9367 4.37658 11.0111 4.07532 10.9202 3.79563C10.8293 3.51594 10.5921 3.31594 10.3011 3.27366L7.75633 2.90389C7.70638 2.89664 7.6632 2.86527 7.64085 2.81998L6.50281 0.514083C6.37268 0.250364 6.10914 0.086544 5.81505 0.086544C5.52096 0.086544 5.25742 0.250364 5.12729 0.514083L3.98925 2.82C3.96688 2.86527 3.92372 2.89664 3.87375 2.90391L1.32905 3.27366C1.03803 3.31594 0.800815 3.51594 0.70991 3.79563C0.619006 4.07532 0.693374 4.37658 0.903986 4.58186L2.74536 6.37676C2.7815 6.41202 2.79802 6.46278 2.78948 6.51255L2.35478 9.04698C2.30508 9.33685 2.42197 9.62426 2.65989 9.79712C2.8978 9.97002 3.20736 9.99235 3.46763 9.85554L5.74368 8.65895C5.78838 8.63544 5.84174 8.63544 5.88646 8.65895L8.16254 9.85554C8.27575 9.91505 8.39825 9.94447 8.52016 9.94445C8.67848 9.94445 8.83581 9.89484 8.97021 9.7971C9.20812 9.62421 9.32504 9.33678 9.27531 9.04696L8.84062 6.51253C8.8321 6.46276 8.84859 6.41199 8.88473 6.37674L10.7261 4.58186ZM8.23593 6.61629L8.67062 9.15077C8.68516 9.23558 8.6328 9.28394 8.60961 9.30078C8.5864 9.31759 8.5242 9.3525 8.44806 9.31243L6.17199 8.11583C6.06026 8.05712 5.93769 8.02772 5.81509 8.02772C5.6925 8.02772 5.56991 8.05712 5.4582 8.11581L3.18215 9.31238C3.10596 9.35243 3.04379 9.31756 3.0206 9.30073C2.99741 9.2839 2.94503 9.23554 2.95959 9.15072L3.39428 6.61629C3.43696 6.36745 3.35453 6.11368 3.1737 5.93743L1.33232 4.14253C1.27069 4.08243 1.28464 4.01253 1.29352 3.98527C1.30236 3.95799 1.33218 3.89323 1.41734 3.88088L3.96202 3.5111C4.21186 3.4748 4.42776 3.31798 4.53952 3.09154L5.67756 0.785616C5.71565 0.708454 5.78643 0.700117 5.81512 0.700117C5.84376 0.700117 5.91454 0.708431 5.95266 0.785616V0.785639L7.09069 3.09156C7.20243 3.318 7.41831 3.47483 7.66815 3.51113L10.2129 3.8809C10.298 3.89326 10.3278 3.95802 10.3367 3.9853C10.3455 4.01258 10.3595 4.08249 10.2979 4.14255L8.45649 5.93746C8.27568 6.11368 8.19325 6.36745 8.23593 6.61629Z" fill="white" />
                                            </svg>


                                          </span>
                                          Get Enterprise plan Now ! </a>
                                        {/* <PurchasePlanModal userType1="Enterprise" userType="" /> */}

                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div>
                            {/* <div className="py-3">
                            <div className="d-flex">
                              <h3 className="blue-text mb-0 flex-grow-1 font-weight-bold my-auto">Design and Publishing</h3>
                              <a className="primary-btn px-3 py-2 d-block text-center d-none" href="javascript:void(0)"> Edit Plans</a>

                            </div>

                          </div> */}
                            {/* <div className="price-table">
                            <table className="table table-bordered ">
                              <thead >
                                <tr>
                                  <th scope="col">Plans</th>
                                  <th scope="col" >Free</th>
                                  <th scope="col">
                                    <span className="mr-3">
                                      <AssetsSvg.PaidContentIcon />
                                    </span>
                                      Pro</th>
                                  <th scope="col">Enterprise</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">Premium stock image library</th>
                                  <td className="text-center">
                                    <span>



                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>
                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Premium stock image library</th>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Create designs with custom dimensions</th>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Export designs as PDF, JPG, PNG</th>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Built-in social sharing and presentation mode</th>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Canva App for designing on the run</th>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">One-click design Magic Resize</th>
                                  <td className="text-center">
                                    <span>



                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">One-click photo Background Remover</th>
                                  <td className="text-center">
                                    <span>



                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Create custom templates and upload your logos and fonts</th>
                                  <td className="text-center">
                                    <span>



                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Download designs with a transparent background and customize download quality</th>
                                  <td className="text-center">
                                    <span>



                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Export designs as animated GIFs or MP4 videos</th>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Create and publish social media content directly from the Canva Editor to 7 platforms.</th>
                                  <td className="text-center">
                                    <span>



                                    </span>

                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <AssetsSvg.Tick />
                                    </span>

                                  </td>

                                  <td className="text-center">
                                    <span>
                                      Template & Admin users only
                                      </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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
        </div>
      </div>
      {/* <PurchasePlanModal /> */}
    </>
  );
}