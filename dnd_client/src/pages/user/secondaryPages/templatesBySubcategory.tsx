/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router-dom";
import { AssetsSvg } from "../../../assets";
import { Spinner, useCreateUserDesign} from "../../../common";
import { DomID, offset } from "../../../config";
import { BootstrapUtils } from "../../../utils";
import { useFunctionalityTemplateSubcategory } from "./hooks";
import { UserModalTemlateDetails } from "../modals";
import { TypeTemplateData } from "../../../models";
import InfiniteScroll from "react-infinite-scroll-component";

export function PageTemplatesBySubcategory(): JSX.Element {
  const routeHistory = useHistory();
  const { createDesignWithoutTemplate, isBusy } = useCreateUserDesign();
  const {
    searchText,
    apiTemplatesData,
    selectedTemplate,
    tags,
    templates,
    isLoading,
    isUpdating,
    setSearchText,
    setSelectedTemplate,
  } = useFunctionalityTemplateSubcategory();
  const [templateSumData, setTemplateSumData] = React.useState<
    TypeTemplateData[]
  >([]);
  const [data, setData] = React.useState<TypeTemplateData[]>([]);
  const [end, setEnd] = React.useState<number>(0);
  const [hasMoreData, setHasMoreData] = React.useState<boolean>(false);

  const initialTemplateDataSplit = (
    templates: TypeTemplateData[] | undefined
  ) => {
    if (templates && templates.length > 0) {
      let templateData = JSON.parse(JSON.stringify(templates));
      const reverseData = templateData.reverse();
      setData(reverseData);
      setTemplateDataForLoading(offset, reverseData);
    }
  };

  const setTemplateDataForLoading = (endPoint: number, list: any[]) => {
    if(endPoint <= list.length) {
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
    setTemplateSumData(list.slice(0, endPoint));
    setEnd(endPoint + offset);
  };

  const fetchMoreData = () => {
    setTemplateDataForLoading(end, data);
  };

  React.useEffect(() => {
    if (templates && templates.length > 0) {
      initialTemplateDataSplit(templates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates]);

  return (
    <>
      <UserModalTemlateDetails
        template={selectedTemplate}
        subCategory={apiTemplatesData?.subCatagory}
      />
      <div className="container-fluid">
        <div>
          <div
            className="custom-shadow site-main-content-body"
            id="templateBySubcategory-scroll-parent"
          >
            <InfiniteScroll
              dataLength={templateSumData.length}
              next={fetchMoreData}
              hasMore={hasMoreData}
              scrollableTarget="templateBySubcategory-scroll-parent"
              loader={<h3 className='text-white pt-2'>Fetching more items...</h3>}
            >
              <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0">
                <div className="md-border-radious overflow-hidden gry-bg mb-3">
                  <div className="p-3 d-flex">
                    <a
                      className="cur-point"
                      href="javascript:void(0)"
                      onClick={routeHistory.goBack}
                    >
                      <p className="mb-0 blue-text mr-2">Templates</p>
                    </a>
                    <p className="mb-0 mr-2">&gt;</p>
                    <a>
                      <p className="mb-0 blue-text mr-2 font-weight-bold">
                        {" "}
                        {apiTemplatesData?.subCatagory.displayName}{" "}
                      </p>
                    </a>
                  </div>
                </div>
                <div className="md-border-radious overflow-hidden gry-bg">
                  <div className="row">
                    <div className="col-12">
                      <div className="py-3 px-3">
                        <div className="d-flex mb-2">
                          <div className="d-block flex-grow-1">
                            <div className="d-flex align-items-center">
                              <h2 className="mb-0 py-2 blue-text font-weight-bold">
                                {" "}
                                {apiTemplatesData?.subCatagory.displayName}{" "}
                              </h2>
                              <div className="d-flex align-items-center pl-2">
                                {isLoading ? (
                                  <>
                                    <Spinner width="60px" height="60px" />{" "}
                                    Loading
                                  </>
                                ) : isUpdating ? (
                                  <>
                                    <Spinner /> Updating
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="d-flex">
                            <p className="mr-3 my-auto">
                              {" "}
                              {apiTemplatesData?.templates.length ?? 0}{" "}
                              templates{" "}
                            </p>
                            {/* eslint-disable-next-line */}
                            <a
                              className="site-primary-btn px-3 py-2 text-center cur-point"
                              href="javascript:void(0)"
                              onClick={() => {
                                if (apiTemplatesData?.subCatagory) {
                                  createDesignWithoutTemplate(
                                    apiTemplatesData.subCatagory.width,
                                    apiTemplatesData.subCatagory.height,
                                    apiTemplatesData.subCatagory.id
                                  );
                                }
                              }}
                            >
                              
                              {isBusy || !apiTemplatesData?.subCatagory.displayName ?  <Spinner fillHtmlCode="#FFFFFF" /> : " Create a blank " +
                              apiTemplatesData?.subCatagory.displayName
                              }
                            </a>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div className="py-2 site-border-top">
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
                                        onChange={(ev) =>
                                          setSearchText(ev.target.value)
                                        }
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
                            <div className="mb-3 py-1 site-border-top site-border-bottom d-none">
                              <div className="py-2 catagory-scroll overflow-x">
                                <div className="row">
                                  <div className="col-12">
                                    <div className="d-flex">
                                      {tags.map((t) => (
                                        <div
                                          key={t.id}
                                          className="tags-desing mr-2"
                                        >
                                          {/* eslint-disable-next-line */}
                                          <a>
                                            <span className="my-auto">
                                              <p className="mb-0 my-auto px-3 py-2">
                                                {" "}
                                                {t.displayName}{" "}
                                              </p>
                                            </span>
                                          </a>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {templateSumData && templateSumData.length > 0 ? (
                              <div className="template-view-grid">
                                {templateSumData.map(
                                  (template: TypeTemplateData, index: number) => (
                                    <div
                                      key={template.id}
                                      className="template-ctl"
                                    >
                                      <div
                                        className="templets-view cur-point"
                                        onClick={() =>
                                          setSelectedTemplate(template)
                                        }
                                      >
                                        {/* eslint-disable-next-line */}
                                        <a
                                          data-toggle="modal"
                                          data-target={BootstrapUtils.GetSelectorById(
                                            DomID.Modals.ViewTemplateDetails
                                          )}
                                        >
                                          <img
                                            className="img-fluid"
                                            src={template.svgThumbUrl}
                                            alt="template"
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
}
