import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AssetsSvg } from "../../../../assets";
import { DomID } from "../../../../config";
import { ActionsDeletaion, DragAndDropAppDispatch } from "../../../../core";
import { BootstrapUtils } from "../../../../utils";

type Props = {
  folders?: {
    id: string;
    label: string;
    linkTo: string;
    categoryId?: string;
    groupId?: string;
  }[];
};

export function LinkFolders(props: Props): JSX.Element {
  const dispatch: DragAndDropAppDispatch = useDispatch();

  return (
    <div className="row">
      {props.folders?.map((folder) => (
        <div
          key={folder.id}
          className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3"
        >
          <div className="folder-ctl px-3 py-3">
            <div className="row">
              <div className="col-10 pl-2 pr-0">
                <Link to={folder.linkTo}>
                  <div className="d-flex">
                    <div>
                      <AssetsSvg.AdminFolder />
                    </div>
                    <div className="folder-name">
                      {" "}
                      <p className="my-auto ml-2"> {folder.label} </p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-2 pr-2 pl-0 text-right">
                <div className="ml-auto pr-1">
                  {folder.categoryId ? (
                    <div
                      className="ml-auto cur-point"
                      data-toggle="modal"
                      data-target={BootstrapUtils.GetSelectorById(
                        DomID.Modals.AddSubCategory
                      )}
                      onClick={() => {
                        dispatch(ActionsDeletaion.SetSubcategoryId({
                          id: folder.id,
                          name: folder.label
                        }));
                      }}
                    >
                      <AssetsSvg.Option />
                    </div>
                  ) : folder.groupId ? (
                    <div
                      className="ml-auto cur-point"
                      data-toggle="modal"
                      data-target={BootstrapUtils.GetSelectorById(
                        DomID.Modals.AddCatagory
                      )}
                      onClick={() => {
                        dispatch(ActionsDeletaion.SetCategoryId({
                          id: folder.id,
                          name: folder.label
                        }));
                      }}
                    >
                      <AssetsSvg.Option />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
