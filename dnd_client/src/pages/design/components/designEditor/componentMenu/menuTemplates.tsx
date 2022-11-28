import React from 'react';
import { shallowEqual } from 'react-redux';
import useSWR from 'swr';
import { AssetsSvg } from '../../../../../assets';
import { Spinner } from '../../../../../common';
import { RoutesAppApi } from '../../../../../config';
import { AxiosAuth, useSelectorTyped, ApiMapperTemplatesByCatagory } from '../../../../../core';
import { TypeCatagoryTemplates } from '../../../../../models';
import { FabricStateContext } from '../../../designPage';

export function MenuTemplates(): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);
  const [searchText, setSearchText] = React.useState<string>('');
  const { selectedTemplateUrl, designSubcategory } = useSelectorTyped(state => ({
    selectedTemplateUrl: state.design.currentDesignConfig?.templateUrl,
    designSubcategory: state.design.currentDesignSubcategory,
  }), shallowEqual);
  const { data: apiTemplatesData, isValidating } = useSWR<TypeCatagoryTemplates>(
    !designSubcategory ? null : () => RoutesAppApi.Template.ByCategoryId(designSubcategory),
    () => AxiosAuth.get(RoutesAppApi.Template.ByCategoryId(designSubcategory as string)).then(r => !!r.data ? ApiMapperTemplatesByCatagory(r.data) : r.data)
  );
  const allTemplates = React.useMemo(() => {
    const templates = apiTemplatesData?.templates
    const data = Array.isArray(templates) ? templates : [];
    if (searchText) {
      const _searchText = searchText.toLowerCase();
      return data.filter(t => t.displayName.toLowerCase().includes(_searchText));
    } else {
      return data;
    }
  }, [searchText, apiTemplatesData]);
  return (
    <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
      <div className="image-creation-elements">
        <div className="d-flex cur-point" id="headingThree" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <div className="p-3 m-auto">
            <AssetsSvg.Templets />
          </div>
          <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Templates</p>
          {isValidating && <div className="d-flex align-items-center"><Spinner /> Updating</div>}
          <span className="collapsed collapsed-custom p-3 d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <AssetsSvg.DownArrow />
          </span>
        </div>
        <div id="collapseOne" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
          <div className="image-creation-elements-expanded">
            <div className="d-flex site-border-botom p-3 ">
              <div className="input-group site-search-sm">
                <input type="text" className="form-control" placeholder="Search" value={searchText} onChange={ev => setSearchText(ev.target.value)} />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <AssetsSvg.SearchIcon />
                  </span>
                </div>
              </div>
              <div className="ml-2 d-none">
                {/* eslint-disable-next-line */}
                <a>
                  <div className="search-filter p-1">
                    <AssetsSvg.SearchFilter />
                  </div>
                </a>
              </div>
            </div>
            <div className="design-display">
              {selectedTemplateUrl && (
                <div className="mt-1 current-itmes">
                  <div className="p-3">
                    <p>Currently using this design</p>
                    <div className="current-singleitem">
                      <img className="img-fluid" src={selectedTemplateUrl} alt="" />
                    </div>
                  </div>
                </div>
              )}
              {allTemplates.length === 0 && <label className="p-2">No Templates For The Design Sub-Category</label>}
              {allTemplates.map(template => (
                <div key={template.id} className="mt-1 other-itmes">
                  <div className="p-3">
                    <div className="d-flex">
                      <p className="flex-grow-1 mb-1"> {template.displayName} </p>
                      {/* eslint-disable-next-line */}
                      {/* <a href="javascript:void(0)">
                        <p className="flex-grow-1 mb-1">See All</p>
                      </a> */}
                    </div>
                    <div className="other--single-itme" onClick={() => fabricState.ControlImage?.LoadTemplate(template.svgUrlProxy || template.svgUrl)}>
                      <img className="img-fluid" src={template.svgThumbUrl} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}