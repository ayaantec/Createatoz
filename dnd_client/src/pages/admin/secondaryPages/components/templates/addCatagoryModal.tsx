import axios from "axios";
import React from "react";
import { AssetsSvg } from "../../../../../assets";
import { Spinner } from "../../../../../common";
import { DomID, RoutesAppApi } from "../../../../../config";
import { useSelectorTyped } from "../../../../../core";
import { BootstrapUtils } from "../../../../../utils";
import { useFunctionalityAddCatagory } from "../../hooks";
import { useDispatch } from "react-redux";
import { ActionsUser } from "../../../../../core/redux/slice/user";
import { ActionsDesign } from "../../../../../core/redux/slice/design";
import { ActionsDeletaion } from "../../../../../core/redux/slice/adminDelete";

export function TemplateCatagoryModalAdd(): JSX.Element {
  const {
    isBusy,
    isUpdateBusy,
    isFormInputValid,
    onCreateCatagory,
    onUpdateCategory,
    setCatagoryName,
    catagoryName,
    iconImage,
    setIconImage,
    coverPhoto,
    setCoverPhoto,
    onDeleteCategory,
  } = useFunctionalityAddCatagory();

  const dispatch = useDispatch();
  const categoryId = useSelectorTyped((state) => state.deleteOption.categoryId);
  React.useEffect(() => {
    if (categoryId?.id && categoryId.name) {
      setCatagoryName(categoryId.name);
    }
  }, [categoryId]);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-4">
            <div>
              <div className="d-flex">
                <a
                  className="site-primary-btn px-3 py-2 text-center"
                  href="javascript:void(0)"
                  data-toggle="modal"
                  data-target={BootstrapUtils.GetSelectorById(
                    DomID.Modals.AddCatagory
                  )}
                  onClick={() => {
                    dispatch(
                      ActionsDeletaion.SetCategoryId({
                        id: "",
                        name: "",
                      })
                    );
                  }}
                >
                  Create new Category
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id={DomID.Modals.AddCatagory}
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered template-modal-ctrl">
          <div className="modal-content">
            <div className="modal-header">
              {categoryId?.id ? (
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Category
                </h5>
              ) : (
                <h5 className="modal-title" id="exampleModalLabel">
                  Create new Category
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
                  <label htmlFor="inputAddress">Category Name</label>
                  {categoryId?.id ? (
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={catagoryName}
                      placeholder={categoryId?.name}
                      onChange={(ev) => setCatagoryName(ev.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      placeholder={categoryId?.name}
                      onChange={(ev) => setCatagoryName(ev.target.value)}
                    />
                  )}
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
                    <label htmlFor="imageUpload">
                      Upload Icon
                      <AssetsSvg.AdminUpload />
                    </label>
                  </span>
                </a>
                <input
                  className="d-none"
                  type="file"
                  id="imageUpload"
                  onChange={(e) => setIconImage(e.target.files?.[0])}
                />
                <label className="pl-2"> {iconImage.name} </label>
              </div>
              <div className="py-2">
                <a
                  className="button-with-icon px-3 py-2 text-center"
                  href="javascript:void(0)"
                >
                  <span className="ml-2">
                    <label htmlFor="fontUpload">
                      Upload CoverPhoto
                      <AssetsSvg.AdminUpload />
                    </label>
                  </span>
                </a>
                <input
                  className="d-none"
                  type="file"
                  id="fontUpload"
                  onChange={(e) => setCoverPhoto(e.target.files?.[0])}
                />
                <label className="pl-2"> {coverPhoto.name} </label>
              </div>
              {categoryId?.id ? null : (
                <div
                  className={`alert ${
                    isFormInputValid ? "alert-success" : "alert-danger"
                  }`}
                  role="alert"
                >
                  Category name is required
                </div>
              )}
            </div>
            <div className="modal-footer d-flex">
              {categoryId?.id ? (
                <div
                  className="flex-grow-1 d-flex cur-point"
                  onClick={() => {
                    if (categoryId !== undefined)
                      onDeleteCategory(categoryId.id);
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
                {categoryId?.id ? (
                  <a
                    className="site-primary-btn px-3 py-2 text-center"
                    href="javascript:void(0)"
                    onClick={() => onUpdateCategory(categoryId)}
                  >
                    {isUpdateBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : "Update"}
                  </a>
                ) : (
                  <a
                    className="site-primary-btn px-3 py-2 text-center"
                    href="javascript:void(0)"
                    onClick={onCreateCatagory}
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
