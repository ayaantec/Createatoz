import React from 'react';
import { ApiHooks, useSelectorTyped } from '../../../core';
import { DomID } from '../../../config';
import { BootstrapUtils } from '../../../utils';
import { TypeSubCatagoryData } from '../../../models';
import { useCreateUserDesign } from '../../../common';
import { AssetsSvg } from '../../../assets';
import CustomLoader from '../../../common/CustomLoader'

type Props = {
  type: 'create' | 'search';
}

export function DesignModal(props: Props): JSX.Element {
  const { data: categoryData } = ApiHooks.Admin.Templates.GetTemplateCatagoy.useHook()
  const { createDesignWithoutTemplate, createCustomDesign, isBusy, isOpenWindow } = useCreateUserDesign();
  const [categoryId, setCategoryId] = React.useState('');
  const [subCategories, setSubCategories] = React.useState<TypeSubCatagoryData[]>();

  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const isUser = useSelectorTyped(state => state.user.isUser);

  React.useEffect(() => {
   if(isOpenWindow){
    BootstrapUtils.ModalHideById(DomID.Modals.CreateDesign);
    setCategoryId('');
   }
  }, [isOpenWindow])

  
  return (
    <>
      {
        props.type === 'create' ? (
          <span className="d-flex" data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.CreateDesign)} data-backdrop="static" data-keyboard="false">
            <span className="ml-auto">
              <AssetsSvg.AddButton />
            </span>

            <span className="mr-auto">
              <p className="my-auto ml-2">Create a design</p>
            </span>
          </span>
        ) : props.type === 'search' ? (
          <>
            <input type="text" placeholder="Search" className="form-control" name="searchText"
              data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.CreateDesign)} />

            <span className="input-group-text search-icon p-0 px-2">
              <AssetsSvg.Search />
            </span>
          </>
        ) : null
      }


      <div className="modal fade" id={DomID.Modals.CreateDesign} role="dialog" aria-labelledby="createdesign-modalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">        
          <div className="modal-content">
            <div className="modal-header">
              {categoryId !== '' ? <AssetsSvg.Back onClick={() => setCategoryId('')} /> : null}
              <h5 className="modal-title" id="exampleModalLongTitle">Design Templates</h5>
              {categoryId === '' ? (
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              ) : null}
            </div>
            
            <div className="modal-body px-0 pb-0">
            { isBusy? <CustomLoader/> :null}
              <div className="site-search mb-3 mx-3">
                <div className="d-flex flex-wrap">
                  <div className="flex-grow-1 mr-2">
                    <div className="input-group">
                      <input type="text" placeholder="Search" className="form-control" name="searchText" />
                      <span className="input-group-text search-icon p-0 px-2">
                        <AssetsSvg.Search />
                      </span>
                    </div>
                  </div>
                </div>
              </div>            
              <div className="site-border-top pt-1" id="01">            
                {
                  categoryId === '' ? (
                    categoryData?.map(category => (
                      <div id="categoryData" key={category.id} className="d-flex py-3 catagory-icons-ctl px-3" onClick={() => { setCategoryId(category.id); setSubCategories(category.subCatagories) }}>
                        <div className="d-flex flex-grow-1">
                          <img src={category.iconUrl} height="16px" width="16px" />
                          <p className="my-auto ml-2">{category.displayName}</p>
                        </div>

                        <div>
                          <AssetsSvg.RightArrow />
                        </div>
                      </div>
                    ))
                  ) : (
                    subCategories?.map(subCategory => (
                      isUser ? (
                        <>                   
                         <div id="categoryData" key={subCategory.id} className="d-flex py-3 catagory-icons-ctl px-3"
                          onClick={() => {
                            createDesignWithoutTemplate(subCategory.width, subCategory.height, subCategory.id, subCategory.displayName);               
                           
                          }}>
                          <div className="d-flex flex-grow-1">
                            <p className="my-auto ml-2">{subCategory.displayName}</p>
                          </div>

                          <div>
                            <AssetsSvg.RightArrow />
                          </div>
                        </div>
                        </>
                      ) :
                        <div id="categoryData" key={subCategory.id} className="d-flex py-3 catagory-icons-ctl px-3" data-toggle="modal"
                          data-target={BootstrapUtils.GetSelectorById(DomID.Modals.Login)}
                          onClick={() => {
                            setCategoryId('');
                            BootstrapUtils.ModalHideById(DomID.Modals.CreateDesign);
                          }}>
                          <div className="d-flex flex-grow-1">
                            <p className="my-auto ml-2">{subCategory.displayName}</p>
                          </div>

                          <div>
                            <AssetsSvg.RightArrow />
                          </div>
                        </div>
                    )
                    )
                  )
                }
              </div>
            </div>

            {categoryId === '' ? (
              <div className="modal-footer p-0">
                <div className="d-flex py-3 px-3 w-100" data-toggle="modal" data-target="#custom-modal"
                  onClick={() => BootstrapUtils.ModalHideById(DomID.Modals.CreateDesign)} > {/* catagory-icons-ctl */}
                  <div className="d-flex flex-grow-1">
                    <AssetsSvg.CustomSize />
                    <p className="my-auto ml-2">Custom Size</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div id="custom-modal" className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="customModal" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered site-modal-login" role="document">
          <div className="modal-content py-3">
            <div className="modal-header mx-4">
              <h3 className="modal-title m-auto" id="login-modalTitle">Insert Dimensions</h3>
            </div>
            <div className="modal-body p-0 pt-3 px-4 ">
              <div className="input-group py-2">
                <input
                  type="number"
                  className="form-control "
                  placeholder="Height"
                  onChange={e => setHeight(e.target.value)}
                />
              </div>
              <div className="input-group py-2 ">
                <input
                  type="number"
                  className="form-control "
                  placeholder="Width"
                  onChange={e => setWidth(e.target.value)}
                />
              </div>
              <div className="d-flex py-3" onClick={() => {
                if (!!height && !!width) {
                  createCustomDesign(Number(width), Number(height));
                  BootstrapUtils.ModalHideById("custom-modal");
                }
              }}>

                {
                  isUser ? (
                    <a className="mx-auto login-btn py-2 px-4 cur-point" href="javascript:void(0)" >
                      Creat Design
                    </a>
                  ) :
                    <a className="mx-auto login-btn py-2 px-4 cur-point" href="javascript:void(0)" data-toggle="modal"
                      data-target={BootstrapUtils.GetSelectorById(DomID.Modals.Login)}
                      onClick={() => BootstrapUtils.ModalHideById("custom-modal")} >
                      Log in to Creat Design
                    </a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}