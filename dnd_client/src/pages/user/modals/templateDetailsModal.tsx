/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React from 'react';
import { toast } from "react-toastify";
import { Spinner, useCreateUserDesign } from '../../../common';
import { DomID } from '../../../config';
import { useSelectorTyped } from '../../../core';
import { TypeSubCatagoryData, TypeTemplateData } from '../../../models';
import { BootstrapUtils } from '../../../utils';
import { useFunctionalityTemplatesChoose } from '../../admin/secondaryPages/hooks';

type Props = {
  id?: string;
  template?: TypeTemplateData;
  subCategory?: TypeSubCatagoryData;
  onTemplateDeleted?: (templateId: string) => void;
}

export function UserModalTemlateDetails(props: Props): JSX.Element {
  const { createDesignWithTemplate, isBusy } = useCreateUserDesign();
  const { deleteTemplateById } = useFunctionalityTemplatesChoose();
  const [isbusyLocal, setIsBusyLocal] = React.useState<boolean>(false);
  const isUser = useSelectorTyped(state => state.user.isUser);
  const isAdmin = useSelectorTyped(state => state.user.isAdmin);
  const isCollaborator = useSelectorTyped(state => state.user.isCollaborator);

  return (
    <div id={props.id || DomID.Modals.ViewTemplateDetails} className="modal fade" tabIndex={-1} role="dialog" aria-hidden="true">
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
                    <img className="img-fluid  sm-border-radious" src={props.template?.svgThumbUrl} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-8 col-md-12 col-sm-12 col-12">
                <div className="border-bottom pb-4">
                  <h3 className="font-weight-bold"> {props.template?.displayName}</h3>
                  <p className="gry-text">
                    <span className="mr-2"> {props.subCategory?.displayName} </span>
                    <span className="mr-2">: {props.subCategory?.width}x{props.subCategory?.height} px</span>
                  </p>
                  <p className="gry-text"><span className="mr-2">You can customize the design</span></p>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div>
                        {/* eslint-disable-next-line */}
                        {
                          isUser ? ( 
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid                            
                            <a
                              className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3"
                              href="javascript:void(0)"
                              onClick={() => {                               // console.log("clicked")
                                if (!!props.subCategory && !!props.template && !!props.template.svgUrlProxy) {
                                  createDesignWithTemplate(
                                    props.subCategory.width,
                                    props.subCategory.height,
                                    props.template.svgUrlProxy,
                                    props.subCategory.id,
                                    props.template.displayName,
                                  );
                                }                            
                              }                          
                            }
                            > {isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Use this Template' }</a>
                          ) :
                            isAdmin || isCollaborator ? <a className="secondary-btn px-3 py-2 d-block text-center" href="javascript:void(0)"
                              onClick={async () => {
                                if (props.template?.id !== undefined) {
                                  setIsBusyLocal(true);
                                  const isDeleted = await deleteTemplateById(props.template.id);
                                  if (isDeleted) {
                                    toast.success("Template deleted successfully");
                                    BootstrapUtils.ModalHideById(DomID.Modals.ViewTemplateDetails);
                                    if (props.onTemplateDeleted) { props.onTemplateDeleted(props.template.id); }
                                  } else {
                                    toast.error("Template deletion failed");
                                  }
                                  setIsBusyLocal(false);
                                }
                              }}>{isbusyLocal ? <Spinner /> : "Delete"}</a>
                              :
                              <a
                                className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3" data-toggle="modal"
                                href="javascript:void(0)"
                                data-target={BootstrapUtils.GetSelectorById(DomID.Modals.Login)}
                                onClick={() => {
                                  BootstrapUtils.ModalHideById(props.id || DomID.Modals.ViewTemplateDetails)
                                }}
                              > Log in to use this Template</a>
                        }
                        {/* <a
                          className="site-primary-btn px-3 py-2 d-block text-center cur-point mb-xl-0 mb-lg-0 mb-md-3 mb-sm-3 mb-3"
                          onClick={() => {
                            if (!!props.subCategory && !!props.template && !!props.template.svgUrlProxy) {
                              createDesignWithTemplate(
                                props.subCategory.width,
                                props.subCategory.height,
                                props.template.svgUrlProxy,
                                props.subCategory.id,
                                props.template.displayName,
                              );
                            }
                          }}
                        > Use this Template</a> */}
                      </div>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div>
                        <a className="secondary-btn px-3 py-2 d-block text-center" href="javascript:void(0)"> Preview</a>
                      </div>
                    </div> */}
                  </div>
                </div>
                {/* <div className="border-bottom pb-4">
                  <p className="gry-text">Colors</p>
                  <div className="popup-contetnt-colors d-flex flex-wrap align-content-start">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div> */}
              </div>
            </div>        
          </div>
        </div>
      </div>
    </div>
  );
}