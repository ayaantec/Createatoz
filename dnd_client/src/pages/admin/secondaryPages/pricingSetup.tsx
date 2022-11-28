import React, { useState } from 'react';
import { AssetsSvg } from '../../../assets';
import { useFunctionalityFontsChoose, useFunctionalityPricingFeatures } from './hooks';
import { PricingText, PricingTextForApi, PackageDescriptions } from '../../../models/pricing';
import { AxiosAuth } from '../../../core';
import RichTextEditor from '../../../common/rich-text-editor/rich-text-editor.component';
import DraggableWindow from './components/draggable-window/draggable-window.component';
import { RoutesAppApi } from '../../../config';

export function PageAdminPricingSetup(): JSX.Element {
  const [isEditable, setIsEditable] = React.useState<Boolean>(false);
  const [valueForSubmission, setvalueForSubmission] = React.useState<any>()

  const {
    state,
    setName,
    addNewPricingCategory,
    pricingCategories
  } = useFunctionalityPricingFeatures();

  const [pricingPackageTexts, setpricingPackageTexts] = React.useState<PricingText[]>([])
  const [openEditor, setOpenEditor] = React.useState<boolean>(false)
  const [editorforMontly, setEditorforMontly] = useState<string>("")

  const [pkgID, setpkgID] = useState<number>(0)
  const [pkgName, setPkgName] = useState<string>("")
  const [pkgDescriptionsForTopFeature, setPkgDescriptionsForTopFeature] = useState<string>("")
  const [pkgDescriptionsForMonthlyPrice, setPkgDescriptionsForMonthlyPrice] = useState<string>("")

  const [type, setType] = useState<string>("")

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
  const getValue = (data: any) => {
    setvalueForSubmission(data)
  };

  const hasWhiteSpace = (value: string) => {
    if (value.trim() === "") {
      return true;
    } else {
      return false;
    }
  }

  const updatePricingText = (data: any) => {
    let updatedArray = [...pricingPackageTexts]
    updatedArray[pkgID - 1] = data
    setpricingPackageTexts(updatedArray)
  }

  const createPackageDataAndSubmit = (descriptions: any) => {
    const packageDescriptionObject: PackageDescriptions = pricingPackageTexts[pkgID - 1].packageDescriptions
    if (type === "monthly") {
      packageDescriptionObject.top_features = String(pkgDescriptionsForTopFeature)
      packageDescriptionObject.monthly_price = String(descriptions)
    }
    else {
      packageDescriptionObject.top_features = String(descriptions)
      packageDescriptionObject.monthly_price = String(pkgDescriptionsForMonthlyPrice)
    }

    const packageCreationPostData: PricingTextForApi = {
      packageId: pkgID,
      packageName: pkgName,
      packageDescriptions: JSON.stringify(packageDescriptionObject)
    }

    const packageDataForUiUpdate: PricingText = {
      packageId: pkgID,
      packageName: pkgName,
      packageDescriptions: packageDescriptionObject
    }

    AxiosAuth.post(RoutesAppApi.Pricing.EditPackageContent(), packageCreationPostData)
      .then((r) => {
        console.log("created package")
        updatePricingText(packageDataForUiUpdate);
      })
      .catch((e) => {
        console.log("something is wrong")
      })
  }

  const handleSubmit = (value: any) => {
    if (!hasWhiteSpace(valueForSubmission)) {
      createPackageDataAndSubmit(valueForSubmission)
    } else {
      console.log("error")
    }
    setOpenEditor(false)
  };

  const onPackageClick = (id: any, name: any, description: any, type: string, ptext: PricingText) => {
    setpkgID(id)
    setPkgName(name)
    if (type === "monthly") {
      setPkgDescriptionsForMonthlyPrice(description)
      setPkgDescriptionsForTopFeature(ptext.packageDescriptions.top_features)
      setType("monthly")
      setEditorforMontly("monthly")
    }
    else {
      setPkgDescriptionsForTopFeature(description)
      setPkgDescriptionsForMonthlyPrice(ptext.packageDescriptions.monthly_price)
      setType("topFeature")
      setEditorforMontly("topFeature")
    }
    setOpenEditor(true)
  }

  const handleClose = () => {
    setOpenEditor(false);
  }

  return (
    <div className="container-fluid gry-bg">
      <div className=" py-3">
        <div className="white-bg custom-shadow site-main-content-body">
          {/* page headding */}
          <div>
            <div className="row">
              <div className="col-12">
                <div className="px-4 pt-4">
                  <h1 className="pb-2">
                    Pricing setup
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {/* page headding */}
          <div className="site-content-without-headding p-4">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><span className="px-4">Account Plan</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><span className="px-4">Currency setup</span></a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="py-3">
                  <div className="d-flex">
                    <h3 className="blue-text mb-0 flex-grow-1 font-weight-bold my-auto">Account Plans</h3>
                    {!isEditable ? (
                      <a className="site-primary-btn px-3 py-2 d-block text-center" href="javascript:void(0)"
                        onClick={() => setIsEditable(!isEditable)}>
                        Edit Plans
                      </a>
                    ) : (
                      <a className="site-primary-btn px-3 py-2 d-block text-center" href="javascript:void(0)"
                        onClick={() => setIsEditable(!isEditable)}>
                        Save
                      </a>
                    )}
                  </div>
                </div>
                <div className="price-table">
                  <table className="table table-bordered ">
                    <thead>
                      <tr>
                        <th scope="col">Plans</th>
                        <th scope="col">Free</th>
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
                        <th scope="row">Monthly price</th>
                        {pricingPackageTexts ? pricingPackageTexts.map((ptext) => {
                          return <td onClick={() => {
                            setOpenEditor(false)
                            onPackageClick(ptext.packageId, ptext.packageName, ptext.packageDescriptions.monthly_price, "monthly", ptext)
                          }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: ptext.packageDescriptions.monthly_price, 
                              }}
                            />
                          </td>
                        })
                          : <td></td>}
                        {openEditor && editorforMontly === "monthly" ?
                          <DraggableWindow title="Edit Package" buttonTxt="Save" onSubmit={
                            handleSubmit} onHandleClose={handleClose} >
                            <RichTextEditor
                              placeholder="Start typing to leave a note..."
                              getValue={getValue} value={pkgDescriptionsForMonthlyPrice}
                            />
                          </DraggableWindow> : null}
                      </tr>
                      <tr >
                        <th scope="row">Top Features</th>
                        {pricingPackageTexts ? pricingPackageTexts.map((ptext) => {
                          return <td onClick={() => {
                            setOpenEditor(false)
                            onPackageClick(ptext.packageId, ptext.packageName, ptext.packageDescriptions.top_features, "topFeature", ptext)
                          }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: ptext.packageDescriptions.top_features,
                              }}
                            />
                          </td>
                        })
                          : <td></td>}
                        {openEditor && editorforMontly === "topFeature" ?
                          <DraggableWindow title="Edit Package" buttonTxt="Save" onSubmit={
                            handleSubmit} onHandleClose={handleClose}>
                            <RichTextEditor
                              placeholder="Start typing to leave a note..."
                              getValue={getValue} value={pkgDescriptionsForTopFeature}
                            />
                          </DraggableWindow> : null}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* <div>
                  <div className="py-3">
                    <div className="d-flex">
                      <a className="site-primary-btn px-3 py-2 d-block text-center" href="javascript:void(0)" data-toggle="modal" data-target="#category-modal">
                        Add new pricing category
                      </a>

                      <div id="category-modal" className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg   modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Create new pricing category</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <form>
                                <div className="form-group">
                                  <label>Category Name</label>
                                  <input type="text" className="form-control" value={state.name} onChange={e => setName(e.target.value)} />
                                </div>
                              </form>
                            </div>
                            <div className="modal-footer">
                              <a className="secondary-btn-link px-3 py-2  text-center" href="javascript:void(0)" data-dismiss="modal"> Cancel</a>
                              <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={addNewPricingCategory} > Add</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {pricingCategories?.map(category => (
                    <div>
                      <div key={category.id} className="d-flex">
                        <h3 className="blue-text mb-0 flex-grow-1 font-weight-bold my-auto">{category.name}</h3>
                      </div>


                      <div className="price-table">
                        <table className="table table-bordered ">
                          <thead>
                            <tr>
                              <th scope="col">Plans</th>
                              <th scope="col" >Free</th>
                              <th scope="col">
                                <span className="mr-3">
                                  <AssetsSvg.PaidContentIcon />
                                </span>
                                Pro
                              </th>
                              <th scope="col">Enterprise</th>
                            </tr>
                          </thead>
                          {category.featureSections?.map(data => (
                            <div>{data.description}</div>
                          ))}
                          {!isEditable ? (
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
                            </tbody>
                          ) : (
                              <tbody>
                                <tr>
                                  <th scope="row">Premium stock image library</th>
                                  <td className="text-center">
                                    <span>
                                      <label className="switch m-auto">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                      </label>
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <label className="switch m-auto">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                      </label>
                                    </span>
                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <label className="switch m-auto">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                      </label>
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            )}
                        </table>
                      </div>
                    </div>
                  ))}
                </div> */}

                <div>
                  <div className="py-3">
                    <div className="d-flex">
                      <h3 className="blue-text mb-0 flex-grow-1 font-weight-bold my-auto">Design and Publishing</h3>
                    </div>
                  </div>

                  <div className="price-table">
                    <table className="table table-bordered ">
                      <thead>
                        <tr>
                          <th scope="col">Plans</th>
                          <th scope="col" >Free</th>
                          <th scope="col">
                            <span className="mr-3">
                              <AssetsSvg.PaidContentIcon />
                            </span>
                            Pro
                          </th>
                          <th scope="col">Enterprise</th>
                        </tr>
                      </thead>
                      {!isEditable ? (
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
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <th scope="row">Premium stock image library</th>
                            <td className="text-center">
                              <span>
                                <label className="switch m-auto">
                                  <input type="checkbox" />
                                  <span className="slider round"></span>
                                </label>
                              </span>
                            </td>
                            <td className="text-center">
                              <span>
                                <label className="switch m-auto">
                                  <input type="checkbox" />
                                  <span className="slider round"></span>
                                </label>
                              </span>
                            </td>

                            <td className="text-center">
                              <span>
                                <label className="switch m-auto">
                                  <input type="checkbox" />
                                  <span className="slider round"></span>
                                </label>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>

                  {/* {pricingCategories?.map(category => (
                    <div>
                      <div key={category.id} className="d-flex">
                        <h3 className="blue-text mb-0 flex-grow-1 font-weight-bold my-auto">{category.name}</h3>
                      </div>


                      <div className="price-table">
                        <table className="table table-bordered ">
                          <thead>
                            <tr>
                              <th scope="col">Plans</th>
                              <th scope="col" >Free</th>
                              <th scope="col">
                                <span className="mr-3">
                                  <AssetsSvg.PaidContentIcon />
                                </span>
                                Pro
                              </th>
                              <th scope="col">Enterprise</th>
                            </tr>
                          </thead>
                          {category.featureSections?.map(data => (
                            <div>{data.description}</div>
                          ))}
                          {!isEditable ? (
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
                            </tbody>
                          ) : (
                              <tbody>
                                <tr>
                                  <th scope="row">Premium stock image library</th>
                                  <td className="text-center">
                                    <span>
                                      <label className="switch m-auto">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                      </label>
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <span>
                                      <label className="switch m-auto">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                      </label>
                                    </span>
                                  </td>

                                  <td className="text-center">
                                    <span>
                                      <label className="switch m-auto">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                      </label>
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            )}
                        </table>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>

              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div>
                  <div className="py-4">
                    <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)"> Add New Currency</a>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="sm-border-radious site-border-all pricing-setup">
                        <div className="pl-3 d-flex site-border-bottom">
                          <p className="blue-text flex-grow-1 my-auto">American Dollar</p>
                          <div className="d-flex">
                            <div className="p-2 ml-auto my-auto">
                              <a href="javascript:void(0)">
                                <span>
                                  <AssetsSvg.AdminEdit02 />
                                </span>
                              </a>
                            </div>
                            <div className="p-2 my-auto mr-2">
                              <a href="javascript:void(0)">
                                <span>
                                  <AssetsSvg.AdminDelete />
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p>Pro Package:<span className="ml-2 blue-text font-weight-bold"> $9.99</span></p>
                          <p className="mb-0">Enterprise Package:<span className="ml-2 blue-text font-weight-bold">$30.99</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="sm-border-radious site-border-all pricing-setup">
                        <div className="pl-3 d-flex site-border-bottom">
                          <p className="blue-text flex-grow-1 my-auto">Canadian dollar</p>
                          <div className="d-flex">
                            <div className="p-2 ml-auto my-auto">
                              <a href="javascript:void(0)">
                                <span>
                                  <AssetsSvg.AdminEdit02 />
                                </span>
                              </a>
                            </div>
                            <div className="p-2 my-auto mr-2">
                              <a href="javascript:void(0)">
                                <span>
                                  <AssetsSvg.AdminDelete />
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p>Pro Package:<span className="ml-2 blue-text font-weight-bold"> $9.99</span></p>
                          <p className="mb-0">Enterprise Package:<span className="ml-2 blue-text font-weight-bold">$30.99</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >
    </div >
  );
}