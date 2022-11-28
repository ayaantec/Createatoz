/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { AssetsSvg } from '../../../../../assets';
import { BootstrapUtils } from '../../../../../utils';
import { useFunctionalityAddTemplate } from '../../hooks';
import { DomID, fileSize, oneKb } from '../../../../../config';
import { toast } from 'react-toastify';
import { Spinner } from '../../../../../common';


type Props = {
  height: number | undefined,
  width: number | undefined
}

export function TemplateModalAdd(props: Props): JSX.Element {
  const {
    state,
    isFormInputValid,
    tagPicker,
    setTemplateName,
    setTemplateCostType,
    setTemplateCurrencyValue,
    setSvgFile,
    setThumbnailFile,
    onCreateTemplate,
  } = useFunctionalityAddTemplate();


  var img = new Image()

  const checkThumbnailDimension = (event: any) => {
    var file: number | undefined = event.target.files?.item(0)?.size;
    if (file !== undefined && file <= fileSize) {
      img.src = window.URL.createObjectURL(event.target.files?.[0]);
      img.onload = () => {
          setThumbnailFile(event.target.files?.[0]); 
      };
    } else {
      toast.error("Template thumbnail size exceeded.");
    }
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-4">
            <div>
              <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.AddTemplate)}>Add new Template</a>
            </div>
          </div>
        </div>
      </div>
      <div id={DomID.Modals.AddTemplate} className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Template</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="inputAddress">Template Name</label>
                  <input type="text" className="form-control" value={state.templateName} onChange={ev => setTemplateName(ev.target.value)} />
                </div>
              </form>
              {/* <label className="py-2" htmlFor="addTemplateFileInput">  <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)"> Upload
              <span className="ml-2">
                  <AssetsSvg.AdminUpload />
                </span>
              </a></label>
              <input className="d-none" id="addTemplateFileInput" type="file" accept=".svg" onChange={ev => setSvgFile(ev.target.files?.[0])} />
              <label className="pl-2"> {state.svgFile?.name} </label> */}
              <div className="py-2" >
                <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                  <span className="ml-2">
                    <label htmlFor="tempUpload">Upload
                          <AssetsSvg.AdminUpload />
                    </label>
                  </span>
                </a>
                <input className="d-none" type="file" id="tempUpload" accept=".svg" onChange={(e) => {
                  setSvgFile(e.target.files?.[0]);
                  // img.src = window.URL.createObjectURL(e.target.files?.[0]);
                  // img.onload = () => {
                  //   if (img.naturalWidth === props.width && img.naturalHeight === props.height) {
                  //     setSvgFile(e.target.files?.[0]);
                  //   } else {
                  //     toast.error("Template dimensions are not supported.");
                  //   }
                  // }
                }} />

                <label className="pl-2"> {state.svgFile?.name} </label>
                <label className="pl-2"> (Svg only) </label>
              </div>

              <div className="py-2" >
                <a className="button-with-icon px-3 py-2 text-center" href="javascript:void(0)">
                  <span className="ml-2">
                    <label htmlFor="tempThumbnailUpload">Upload
                          <AssetsSvg.AdminUpload />
                    </label>
                  </span>
                </a>
                <input className="d-none" type="file" id="tempThumbnailUpload" accept=".img, .png, .jpg" max-file-size= "100000" 
                onChange={(event) => {checkThumbnailDimension(event)
                }} 
                 />

                <label className="pl-2"> {state.thumbnailFile?.name} </label>
                <label className="pl-2"> (Template thumbnail, max limit `${fileSize/oneKb} kb) </label>
              </div>

              {/* <form>
                <div className="form-group my-2 ">
                  <Select
                    options={tagPicker.apiTags?.map(t => ({ label: t.displayName, value: t.id }))}
                    onChange={(opt, meta) => {
                      if (meta.action === 'select-option' && !!opt) {
                        tagPicker.toggleTagSelection(opt.value);
                      }
                    }}
                    isClearable
                    isSearchable
                  />
                </div>
              </form> */}
              <div className="py-2">
                <div className="flex-wrap align-content-start d-flex">
                  {tagPicker.selectedTags.map(tag => (
                    <div key={tag.id} className="post-tags py-1 px-3 d-flex mr-2 my-1">
                      <p className="mb-0 mr-2"> {tag.displayName} </p>
                      <a className="gry-text" href="javascript:void(0)" onClick={() => tagPicker.removeTag(tag.id)}>X</a>
                    </div>
                  ))}
                </div>
              </div>
              <form className="d-flex my-3">
                <div className="form-check mr-3">
                  <label className="form-check-label" htmlFor="radio1">
                    <input type="radio"
                      className="form-check-input"
                      id="radio1"
                      name="optradio"
                      defaultValue="option1"
                      checked={state.costType === '0'}
                      value={0}
                      onClick={() => setTemplateCostType('0')} />Free
                  </label>
                </div>
                <div className="form-check mr-3">
                  <label className="form-check-label" htmlFor="radio1">
                    <input type="radio"
                      className="form-check-input"
                      id="radio1"
                      name="optradio"
                      defaultValue="option1"
                      checked={state.costType === '1'}
                      value={1}
                      onClick={() => setTemplateCostType('1')} />Premium content
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="radio1">
                    <input type="radio"
                      className="form-check-input"
                      id="radio1"
                      name="optradio"
                      defaultValue="option1"
                      checked={state.costType === '2'}
                      value={2}
                      onClick={() => setTemplateCostType('2')} />Exclusive content
                  </label>
                </div>
              </form>
              {state.costType !== '0' ? (
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputState">Currency type</label>
                      <select id="inputState" className="form-control">
                        <option selected>American Dollar</option>
                        <option>...</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPassword4">Set Price</label>
                      <input type="text" className="form-control" placeholder="$3.25" />
                    </div>
                  </div>
                </form>
              ) : null}

              {/* <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Currency type</label>
                    <select id="inputState" className="form-control">
                      <option selected>Bangladeshi Taka</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Set Price</label>
                    <input type="text" className="form-control" placeholder="৳ 149.99" />
                  </div>
                </div>
              </form> */}
            </div>
            <div className={`alert ${isFormInputValid ? 'alert-success' : 'alert-danger'}`} role="alert">
              Template name is required, template width {props.width} and height {props.height} is required
            </div>
            <div className="modal-footer">
              <a className="secondary-btn-link px-3 py-2  text-center" href="javascript:void(0)" data-dismiss="modal"> Cancel</a>
              <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)" onClick={state.isBusy ? undefined : onCreateTemplate}>
                {state.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Add'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}