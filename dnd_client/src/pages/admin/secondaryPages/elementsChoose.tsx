/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { AssetsSvg } from "../../../assets";
import { ElementSubCategory, offset, RoutesAppUi, DomID } from "../../../config";
import { TypeElementData } from "../../../models";
import { AddModal } from "../modals";
import { useFunctionalityElementsChoose } from "./hooks";
import { useSelectorTyped } from "../../../core";
import { TypeVideoData } from "../../../models";
import { BootstrapUtils } from "../../../utils";
import { DeleteModal } from "../modals/deleteModal";

export function PageAdminElementsChoose(): JSX.Element {
  const [elementId, setElementId] = React.useState<string | undefined>();
  const isAdmin = useSelectorTyped((state) => state.user.isAdmin);
  const isCollaborator = useSelectorTyped((state) => state.user.isCollaborator);
  const { elements } = useFunctionalityElementsChoose();
  const subcategoryID =
    RoutesAppUi.Admin.ElementsChoose.BySubCategory.useParam();

  const [elementSumData, setElementSumData] = React.useState<TypeElementData[]>(
    []
  );
  const [data, setData] = React.useState<TypeElementData[]>([]);
  const [end, setEnd] = React.useState<number>(0);
  const [hasMoreData, setHasMoreData] = React.useState<boolean>(false);
  
  const initialElementDataSplit = (element: TypeElementData[]) => {
    if (element && element.length >= 0) {
      let elementData = element;
      const reverseData = elementData.reverse();
      setData(reverseData);
      setElementDataForLoading(offset, reverseData);
    }
  };

  const setElementDataForLoading = (
    endPoint: number,
    list: TypeElementData[]
  ) => {
    if(endPoint <= list.length) {
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
    setElementSumData(list.slice(0, endPoint));
    setEnd(endPoint + offset);
  };

  const fetchMoreData = () => {
    setElementDataForLoading(end, data);
  };

  React.useEffect(() => {
    if (elements && elements.length >= 0) {
      initialElementDataSplit(elements);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements]);
  
  return (
    <>
      <div className="container-fluid gry-bg">
        <div className=" py-3">
          <div className="white-bg custom-shadow site-main-content-body">
            <div>
              <div className="row">
                <div className="col-12">
                  <div className="px-4 pt-4">
                    <h1 className="pb-2">
                      <span className="gry-text">
                        <Link to={RoutesAppUi.Admin.Elements.Root()}>
                          Elements
                        </Link>
                      </span>{" "}
                      <span className="mx-2">/</span>
                      {subcategoryID === ElementSubCategory.SHAPES ? (
                        <span>
                          <a href="javascript:void(0)"> Shapes</a>
                        </span>
                      ) : subcategoryID === ElementSubCategory.LINES ? (
                        <span>
                          <a href="javascript:void(0)"> Lines</a>
                        </span>
                      ) : subcategoryID === ElementSubCategory.STICKER ? (
                        <span>
                          <a href="javascript:void(0)"> Stickers</a>
                        </span>
                      ) : subcategoryID === ElementSubCategory.ANIMATION ? (
                        <span>
                          <a href="javascript:void(0)"> Animation</a>
                        </span>
                      ) : null}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="site-content-without-headding p-4"
              id="elements-scroll-parent"
            >
              <InfiniteScroll
                dataLength={elementSumData.length}
                next={fetchMoreData}
                hasMore={hasMoreData}
                scrollableTarget="elements-scroll-parent"
                className="pt-2"
                loader={<h3 className='text-white pt-2'>Fetching more items...</h3>}
              >
                {subcategoryID === ElementSubCategory.SHAPES ? (
                  <AddModal type="Shape" />
                ) : subcategoryID === ElementSubCategory.LINES ? (
                  <AddModal type="Line" />
                ) : subcategoryID === ElementSubCategory.STICKER ? (
                  <AddModal type="Sticker" />
                ) : subcategoryID === ElementSubCategory.ANIMATION ? (
                  <AddModal type="Animation" />
                ) : null}
                {isAdmin || isCollaborator ? <DeleteModal type='Element' id={elementId}/> : null}
                <div className="pb-4">
                  <div className="site-search">
                    <div className="d-flex flex-wrap">
                      <div className="flex-grow-1 mr-2">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Search"
                            className="form-control"
                            name="searchText"
                          />
                          <span className="input-group-text search-icon p-0 px-2">
                            <a>
                              <AssetsSvg.AdminSearchIcon />
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="template-view-grid">
                    {elementSumData.map((img) =>
                      Number(img.elementType) === Number(subcategoryID) ? (
                        <div className="template-ctl">
                          <div className="mb-3">
                            <div className="shape-ctl">
                              <div className="shape-priview">
                                <img
                                  className="img-fluid"
                                  src={img.elementThumbUrl}
                                  alt=""
                                />
                              </div>
                              <div className="animation-options">
                                <div className="row">
                                  <div className="col-7">
                                    <div className="p-2 px-3 content-name">
                                      <p className="mb-0 font-weight-bold ">
                                        {img.displayName}
                                      </p>
                                      <p className="mb-0 gry-text">
                                        <a>
                                          By<span className="ml-2">Admin</span>
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-5 d-flex">
                                    <div 
                                      className="ml-auto p-1 ml-auto my-auto"
                                      data-toggle="modal"
                                      data-target={BootstrapUtils.GetSelectorById(
                                        DomID.Modals.DeleteModal
                                      )} 
                                      onClick={() => setElementId(img.id)}
                                      >
                                        <button className="secondary-btn-link px-2 py-1 text-center btn-sm">Delete</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
                {/* <div className="mb-3 py-1 site-border-top site-border-bottom d-none">
                <div className="py-2 catagory-scroll overflow-x">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex">
                        <div className="tags-desing mr-2">
                          <a href="javascript:void(0)">
                            <span className="my-auto">
                              <p className="mb-0 my-auto px-3 py-2">Tag Name</p>
                            </span>
                          </a>
                        </div>

                        <div className="tags-desing mr-2">
                          <a href="javascript:void(0)">
                            <span className="my-auto">
                              <p className="mb-0 my-auto px-3 py-2">Tag Name</p>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                {/* folder items */}

                {/* <div>
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="mb-3">
                      <div className="animation-ctl">
                        <img className="img-fluid " src={RoutesAsset.Admin.Animations.Anm01} />
                        <div className="animation-options">
                          <div className="row">
                            <div className="col-8">
                              <div className="p-2 px-3 content-name">
                                <p className="mb-0 font-weight-bold ">Animation Name</p>
                                <p className="mb-0 gry-text"><a>By <span className="ml-2">User Name</span></a></p>
                              </div>
                            </div>
                            <div className="col-4 d-flex ">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="mb-3">
                      <div className="animation-ctl">
                        <img className="img-fluid " src={RoutesAsset.Admin.Animations.Anm22} />
                        <div className="animation-options">
                          <div className="row">
                            <div className="col-8">
                              <div className="p-2 px-3 content-name">
                                <p className="mb-0 font-weight-bold ">Animation Name</p>
                                <p className="mb-0 gry-text"><a>By <span className="ml-2">User Name</span></a></p>
                              </div>
                            </div>
                            <div className="col-4 d-flex ">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
