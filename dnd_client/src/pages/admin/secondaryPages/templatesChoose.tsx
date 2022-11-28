/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { AssetsSvg } from "../../../assets";
import { useFunctionalityTemplatesChoose } from "./hooks";
import { TemplateModalAdd } from "./components";
import { TypeTemplateData } from "../../../models";
import InfiniteScroll from "react-infinite-scroll-component";
import { DomID, offset } from "../../../config/constants";
import { BootstrapUtils } from "../../../utils";
import { UserModalTemlateDetails } from "../../user/modals";

type TemplatePreviewProps = {
  id: string;
  svgThumbUrl?: string;
  onTemplateSelected: () => void;
};

function TemplatePreview(props: TemplatePreviewProps): JSX.Element {
  const [isBusy, setIsBusy] = React.useState<boolean>(true);

  return (
    <>
      <div
        key={props.id}
        className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 pb-3"
      >
        <div
          className="templets-view cur-point"
          onClick={() => { props.onTemplateSelected() }}
        > 
          {/* {isBusy && <Spinner />} */}
          <a
            data-toggle="modal"
            data-target={BootstrapUtils.GetSelectorById(
              DomID.Modals.ViewTemplateDetails
            )}
          >
            <img
              onLoad={() => setIsBusy(false)}
              className="img-fluid img-cover "
              src={props.svgThumbUrl}
              alt="demo-template"
            />
          </a>
        </div>
      </div>
    </>
  );
}

export function PageAdminTemplatesChoose(): JSX.Element {
  const {
    searchText,
    setSearchText,
    tags,
    templates,
    subCatagoryData
  } = useFunctionalityTemplatesChoose();
  const [selectedTemplate, setSelectedTemplate] = React.useState<TypeTemplateData>();
  const [templateSumData, setTemplateSumData] = React.useState<TypeTemplateData[]>([]);
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

  const removeTemplate = (id: string) => {
    const index = data.findIndex((item) => item.id === id);
    if (index > -1) {
      data.splice(index, 1);
      updateSumData(end, data);
    }
  }

  const updateSumData = (endPoint: number, list: TypeTemplateData[]) => {
    if (endPoint <= list.length) {
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
    setTemplateSumData(list.slice(0, endPoint));
  };

  const setTemplateDataForLoading = (endPoint: number, list: TypeTemplateData[]) => {
    updateSumData(endPoint, list);
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
        subCategory={subCatagoryData}
        onTemplateDeleted = {(templateId: string)=>{removeTemplate(templateId)}}
      />
      <div className="container-fluid gry-bg">
        <div className=" py-3">
          <div className="white-bg custom-shadow site-main-content-body">
            {/* page headding */}

            <div>
              <div className="row">
                <div className="col-12">
                  <div className="px-4 pt-4">
                    <h1 className="pb-2"> {subCatagoryData?.displayName} </h1>
                  </div>
                </div>
              </div>
            </div>
            {/* page headding */}
            <div>
              <div
                className="site-content-without-headding p-4"
                id="templateChoose-scroll-parent"
              >
                <InfiniteScroll
                  dataLength={templateSumData.length}
                  next={fetchMoreData}
                  hasMore={hasMoreData}
                  scrollableTarget="templateChoose-scroll-parent"
                  className="pt-2"
                  loader={<h3 className='text-white pt-2'>Fetching more items...</h3>}
                >
                  <TemplateModalAdd
                    height={subCatagoryData?.height}
                    width={subCatagoryData?.width}
                  />
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
                            {tags.map((tag) => (
                              <div key={tag.id} className="tags-desing mr-2">
                                <a href="javascript:void(0)">
                                  <span className="my-auto">
                                    <p className="mb-0 my-auto px-3 py-2">
                                      {" "}
                                      {tag.displayName}{" "}
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
                  <div>
                    <div className="row">
                      {templateSumData.map((template: TypeTemplateData) => (
                        <TemplatePreview 
                          id={template.id} 
                          svgThumbUrl={template.svgThumbUrl} 
                          onTemplateSelected={() => setSelectedTemplate(template)}
                          />
                      ))}
                    </div>
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
