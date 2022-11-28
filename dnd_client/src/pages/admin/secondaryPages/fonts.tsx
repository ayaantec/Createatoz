/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AssetsSvg } from "../../../assets";
import { offset } from "../../../config/constants";
import { TypeFontData } from "../../../models";
import { AddModal } from "../modals";
import { useFunctionalityFontsChoose } from "./hooks";
import { BootstrapUtils } from "../../../utils";
import { DomID } from "../../../config";
import { useSelectorTyped } from "../../../core";
import { DeleteModal } from "../modals/deleteModal";

export function PageAdminFonts(): JSX.Element {
  const [fontId, setFontId] = React.useState<string | undefined>();
  const isAdmin = useSelectorTyped((state) => state.user.isAdmin);
  const isCollaborator = useSelectorTyped((state) => state.user.isCollaborator);
  const { searchText, setSearchText, fonts } = useFunctionalityFontsChoose();

  const [fontsSumData, setFontsSumData] = React.useState<TypeFontData[]>([]);
  const [data, setData] = React.useState<TypeFontData[]>([]);
  const [end, setEnd] = React.useState<number>(0);
  const [hasMoreData, setHasMoreData] = React.useState<boolean>(false);
  
  const initialFontsDataSplit = (font: TypeFontData[]) => {
    if (font && font.length >= 0) {
      let fontData = font;
      const reverseData = fontData.reverse();
      setData(reverseData);
      setFontsDataForLoading(offset, reverseData);
    }
  };

  const setFontsDataForLoading = (endPoint: number, list: TypeFontData[]) => {
    if(endPoint <= list.length) {
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
    setFontsSumData(list.slice(0, endPoint));
    setEnd(endPoint + offset);
  };

  const fetchMoreData = () => {
    setFontsDataForLoading(end, data);
  };

  React.useEffect(() => {
    if (fonts && fonts.length >= 0) {
      initialFontsDataSplit(fonts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fonts]);

  return (
    <>
      <div className="container-fluid gry-bg">
        <div className=" py-3">
          <div className="white-bg custom-shadow site-main-content-body">
            {/* page headding */}
            <div>
              <div className="row">
                <div className="col-12">
                  <div className="px-4 pt-4">
                    <h1 className="pb-2">Fonts</h1>
                  </div>
                </div>
              </div>
            </div>
            {/* page headding */}
            <div
              className="site-content-without-headding p-4"
              id="fonts-scroll-parent"
            >
              <InfiniteScroll
                dataLength={fontsSumData.length}
                next={fetchMoreData}
                hasMore={hasMoreData}
                scrollableTarget="fonts-scroll-parent"
                className="pt-2"
                loader={<h3 className='text-white pt-2'>Fetching more items...</h3>}
              >
                {/* dashbord contetns cards */}
                <AddModal type="Font" />
                {isAdmin || isCollaborator ? <DeleteModal type='Font' id={fontId}/> : null}
                {/* dashbord contetns cards */}
                {/* search items */}
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
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
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
                {/* search items */}
                <div className="mb-3 py-1 site-border-top site-border-bottom d-none">
                  <div className="py-2 catagory-scroll overflow-x">
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex">
                          {/* {tags.map(tag => (
                          <div key={tag.id} className="tags-desing mr-2">
                            <a href="javascript:void(0)">
                              <span className="my-auto">
                                <p className="mb-0 my-auto px-3 py-2"> {tag.displayName} </p>
                              </span>
                            </a>
                          </div>
                        ))} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* folder items */}
                <div>
                  <div className="template-view-grid">
                    {fontsSumData?.map((fnt) => (
                      // <div key={fnt.id} className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                      //   <div className="mb-3">
                      //     <div className="video-ctl">
                      //       <img className="img-fluid " src={fnt.previewFont} alt={fnt.displayName} />
                      //       <div className="video-options">
                      //         <div className="row">
                      //           <div className="col-9">
                      //             <div className="p-2 px-3 content-name">
                      //               <p className="mb-0 font-weight-bold ">Font Name</p>
                      //               <p className="mb-0 gry-text"><a>By <span className="ml-2">User Name</span></a></p>
                      //             </div>
                      //           </div>
                      //           <div className="col-3 d-flex ">
                      //             <div className="p-2 ml-auto my-auto">
                      //               <a href="javascript:void(0)">
                      //                 <span>
                      //                   <AssetsSvg.AdminEdit02 />
                      //                 </span>
                      //               </a>
                      //             </div>
                      //             <div className="p-2 my-auto mr-2">
                      //               <a href="javascript:void(0)">
                      //                 <span>
                      //                   <AssetsSvg.AdminDelete />
                      //                 </span>
                      //               </a>
                      //             </div>
                      //           </div>
                      //         </div>
                      //       </div>
                      //     </div>
                      //   </div>
                      // </div>
                  
                      <div
                        key={fnt.id}
                        className="template-ctl mb-3"
                      >
                        <div className="font-admin-ctl">
                          <div className="font-preview">
                            <img
                              className="img-fluid"
                              src={fnt.previewImgUrl}
                              alt={fnt.displayName}
                            />
                          </div>
                          <div className="row pb-2 px-1">
                            <div className="col-7">
                              <div className="p-2 px-3 content-name">
                                <p className="mb-0 font-weight-bold ">{fnt.displayName}</p>
                                {/* <p className="mb-0 gry-text"><a>By <span className="ml-2">User Name</span></a></p> */}
                              </div>
                            </div>
                            <div className="col-5 d-flex">
                              <div 
                                className="ml-auto p-1 ml-auto my-auto"
                                data-toggle="modal"
                                data-target={BootstrapUtils.GetSelectorById(
                                  DomID.Modals.DeleteModal
                                )} 
                                onClick={() => setFontId(fnt.id)}
                                >
                                  <button className="secondary-btn-link px-2 py-1 text-center btn-sm">Delete</button>
                              </div>
                            </div>
                          </div>
                          {/* <div className="py-2 px-3">
                            <label>{fnt.displayName}</label>
                          </div> */}
                        </div>
                      </div>
                   
                    ))}
                  </div>
                </div>
              </InfiniteScroll>
            </div>
            {/* folder items */}
          </div>
        </div>
      </div>
      {/* <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <AddModal type="Font" />
      </div> */}
    </>
  );
}
