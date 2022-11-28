/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { RoutesAppUi, RoutesAppApi } from "../../../../config";
import { AxiosAuth } from "../../../../core";
import { ApiMapperTemplatesByCatagory } from "../../../../core/api/mappers";
import { TypeTemplateData, TypeCatagoryTemplates } from "../../../../models";
import { BootstrapUtils } from "../../../../utils";
import { UserModalTemlateDetails } from "../../modals";

type Props = {
  id: string;
};

export function UseFunctionalityShowTemplate(props: Props): JSX.Element {
  const offset = 10;
  const [initialTemplateData, setInitialTemplateData] = React.useState<
    TypeTemplateData[]
  >([]);
  const [searchText, setSearchText] = React.useState<string>("");

  const [selectedTemplate, setSelectedTemplate] =
    React.useState<TypeTemplateData>();

  const subCatagoryUrl = RoutesAppApi.Template.ByCategoryId(props.id);
  const { data: apiTemplatesData, isValidating } =
    useSWR<TypeCatagoryTemplates>(subCatagoryUrl, () =>
      AxiosAuth.get(subCatagoryUrl).then((r) =>
        !!r.data ? ApiMapperTemplatesByCatagory(r.data) : r.data
      )
    );

  const templates = React.useMemo(() => {
    if (!!searchText) {
      const _searchText = searchText.toLowerCase();
      return apiTemplatesData?.templates.filter((t) =>
        t.displayName.toLowerCase().includes(_searchText)
      );
    }
    return apiTemplatesData?.templates;
  }, [searchText, apiTemplatesData]);

  const TemplateViewId = `home_template_view${props.id}`;

  React.useEffect(() => {
    if (templates && templates.length > 0) {
      let templatesData = JSON.parse(JSON.stringify(templates));
      templatesData.reverse();
      setInitialTemplateData(templatesData.slice(0, offset));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates]);

  return (
    <>
      <UserModalTemlateDetails
        id={TemplateViewId}
        template={selectedTemplate}
        subCategory={apiTemplatesData?.subCatagory}
      />
      {/* <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-4">
          <div>
            {
              templates?.map((template) => (
                <div key={template.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 pb-3">
                  <div className="templets-view cur-point" onClick={() => setSelectedTemplate(template)}>
                    <a data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(TemplateViewId)}>
                      <img className="img-fluid img-cover " src={template.svgUrl} alt="template" />
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div> */}

      <div className="px-3 ">
        <div className="row flex-row flex-nowrap overflow-auto-hover pb-2">
          {initialTemplateData?.map((template) => (
            <div
              key={template.id}
              className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
              onClick={() => setSelectedTemplate(template)}
            >
              <a
                data-toggle="modal"
                data-target={BootstrapUtils.GetSelectorById(TemplateViewId)}
              >
                <div className="template-thumb">
                  <img
                    className="img-fluid"
                    src={template.svgThumbUrl}
                    alt="template"
                  />
                </div>
              </a>
            </div>
          ))}
          {initialTemplateData && initialTemplateData.length >= offset ? (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 align-self-center">
              <Link
                to={RoutesAppUi.Templates.BySubCatagory.Load(String(props.id))}
              >
                <div className="site-primary-btn px-3 py-2 justify-content-center template-thumb d-flex align-items-center">
                  <h3 className="mb-0 text-white ">See All</h3>
                </div>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
