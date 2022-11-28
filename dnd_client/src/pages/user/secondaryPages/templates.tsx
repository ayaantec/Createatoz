import React from 'react';
import { Link } from 'react-router-dom';
import { AssetsPng } from '../../../assets';
import { Spinner } from '../../../common';
import { DomID, RoutesAppUi, RoutesAsset } from '../../../config';
import { ApiHooks } from '../../../core';
import { BootstrapUtils } from '../../../utils';
import { BannerChangerModal } from '../modals';

export function PageTemplates(): JSX.Element {
  const { data: categoryData, isValidating } = ApiHooks.Admin.Templates.GetTemplateCatagoy.useHook();
  return (
    <div className="container-fluid">
      <div>
        <div className="custom-shadow site-main-content-body">
          <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0">
            <div className="md-border-radious overflow-hidden mb-3 site">
              <div className="row">
                <div className="col-12">
                  <BannerChangerModal type="Template" />
                </div>
              </div>
            </div>
            <div className="md-border-radious overflow-hidden gry-bg mb-2">
              <div className="row">
                <div className="col-12">
                  <div className="py-3 px-3">
                    <div className="d-flex align-items-center">
                      <h2 className="mb-0 py-2 blue-text font-weight-bold">Browse by category</h2>
                      <div className="pl-2">
                        {!isValidating ? null
                          : (
                            <div className="d-flex align-items-center"><Spinner /> {categoryData === undefined ? 'Loading' : 'Updating'} </div>
                          )}
                      </div>
                    </div>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="my-3">
                          <div className="row flex-row flex-nowrap overflow-auto-hover pb-2">
                            {categoryData?.map(category => (
                              <div key={category.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 d-flex w-100">
                                <div className="content-card-with-sm-banner">
                                  <div className="content-card-with-sm-banner-banner-img">

                                    <img className="img-fluid" src={category.coverPhotoUrl} alt="" height="200px" width="200px" />
                                  </div>
                                  <div className="p-3 content-card-with-sm-banner-banner-content">
                                    <h2 className="pb-2"> {category.displayName} </h2>
                                    <div className="row">
                                      {category.subCatagories?.map(subCategory => (
                                        <div key={subCategory.id} className="col-6  mb-3">
                                          <Link to={RoutesAppUi.Templates.BySubCatagory.Load(subCategory.id)}>
                                            <div className="content-thumb-ctl">
                                              <div className="content-thumb-image">
                                                <img className="img-fluid" src={subCategory.thumbNailUrl} alt="" height="100px" width="100px" />
                                              </div>
                                              <div className="content-thumnb-info p-2 mb-3">
                                                <h3 className="mb-0"> {subCategory.displayName} </h3>
                                                <p className="mb-0 gry-text"> {`${subCategory.width}x${subCategory.height}`} px</p>
                                              </div>
                                            </div>
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
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