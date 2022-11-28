import React from "react";
import { AssetsSvg } from "../../../../../assets";
import { Spinner } from "../../../../../common";
import { DomID } from "../../../../../config";
import { useSelectorTyped } from "../../../../../core";
import { BootstrapUtils } from "../../../../../utils";
import { useFunctionalityAddSubCategory } from "../../hooks";
import { useDispatch } from "react-redux";
import { ActionsDeletaion } from "../../../../../core/redux/slice/adminDelete";

export function TemplateSubCatagoryModalAdd(): JSX.Element {
  const {
    isBusy,
    inputFormData,
    isFormInputValid,
    updateFormData,
    onCreateSubCatagory,
    subCoverPhoto,
    setSubCoverPhoto,
    onDeleteSubCategory,
  } = useFunctionalityAddSubCategory();

  const dispatch = useDispatch();
  const subcategoryId = useSelectorTyped(
    (state) => state.deleteOption.subcategoryId
  );

  return (
    <>
      <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-4">
            <div>
              <a
                className="site-primary-btn px-3 py-2 text-center"
                href="javascript:void(0)"
                data-toggle="modal"
                data-target={BootstrapUtils.GetSelectorById(
                  DomID.Modals.AddSubCategory
                )}
                onClick={() => {
                  dispatch(
                    ActionsDeletaion.SetSubcategoryId({
                      id: "",
                      name: "",
                    })
                  );
                }}
              >
                Create new Sub-Category
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        id={DomID.Modals.AddSubCategory}
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered template-modal-ctrl">
          <div className="modal-content">
            <div className="modal-header">
              {subcategoryId?.id ? (
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Subcategory
                </h5>
              ) : (
                <h5 className="modal-title" id="exampleModalLabel">
                  Create new Subcategory
                </h5>
              )}
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="inputAddress">Subcategory Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={subcategoryId?.name}
                    onChange={(ev) =>
                      updateFormData("categoryName", ev.target.value)
                    }
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Width</label>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      value={inputFormData.width}
                      onChange={(ev) =>
                        updateFormData("width", ev.target.value)
                      }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Height</label>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      value={inputFormData.height}
                      onChange={(ev) =>
                        updateFormData("height", ev.target.value)
                      }
                    />
                  </div>
                </div>
                {/* <div className="d-flex py-2">
                  <label className="switch mb-0">
                    <input type="checkbox" />
                    <span className="slider round" />
                  </label>
                  <p className="gry-text mb-0 ml-3">Will Have Feature Banner</p>
                </div> */}
              </form>

              <div className="py-2">
                <a
                  className="button-with-icon px-3 py-2 text-center"
                  href="javascript:void(0)"
                >
                  <span className="ml-2">
                    <label htmlFor="thumbnailUpload">
                      Upload Cover Photo
                      <AssetsSvg.AdminUpload />
                    </label>
                  </span>
                </a>
                <input
                  className="d-none"
                  type="file"
                  id="thumbnailUpload"
                  onChange={(e) =>
                    e.target.files !== null
                      ? setSubCoverPhoto(e.target.files?.[0])
                      : null
                  }
                />
                <label className="pl-2"> {subCoverPhoto.name} </label>
              </div>

              {subcategoryId?.id ? null : (
                <div
                  className={`alert ${
                    isFormInputValid ? "alert-success" : "alert-danger"
                  }`}
                  role="alert"
                >
                  Subcategory name, height and width are required
                </div>
              )}
            </div>
            <div className="modal-footer d-flex">
              {subcategoryId?.id ? (
                <div
                  className="flex-grow-1 d-flex cur-point"
                  onClick={() => {
                    if (subcategoryId !== undefined) {
                      onDeleteSubCategory(subcategoryId.id);
                    }
                  }}
                >
                  <div className="d-flex">
                    <p className="my-auto">{isBusy ? <Spinner /> : "Delete"}</p>
                    <AssetsSvg.DeleteIcon />
                  </div>
                </div>
              ) : null}
              <a
                className="secondary-btn-link px-3 py-2  text-center"
                href="javascript:void(0)"
                data-dismiss="modal"
              >
                Cancel
              </a>
              {subcategoryId?.id ? null : (
                <a
                  className="site-primary-btn px-3 py-2 text-center"
                  href="javascript:void(0)"
                  onClick={onCreateSubCatagory}
                >
                  {isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : "Add"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
