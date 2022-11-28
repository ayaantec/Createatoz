import axios from 'axios';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AssetsSvg } from '../../../assets';
import { RoutesAppApi, RoutesAppUi } from '../../../config';
import { LinkFolders, TemplateSubCatagoryModalAdd } from './components';
import { useFunctionalityTemplateSubCategory } from './hooks';

export function PageAdminTemplateSubcategory(): JSX.Element {
  const routeHistory = useHistory();
  const {
    searchText,
    subCatagoryByCatagory,
    setSearchText,
  } = useFunctionalityTemplateSubCategory();


    
  type categoryId = {
    categoryId: string;
  }

  let id: categoryId = useParams();

  return (
    <div className="container-fluid gry-bg">
      <div className=" py-3">
        <div className="white-bg custom-shadow site-main-content-body">
          <div>
            <div className="row">
              <div className="col-12">
                <div className="px-4 pt-4">
                  <h1 className="pb-2"><span className="cur-point" onClick={routeHistory.goBack}>...Category</span> / Sub-Category</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="site-content-without-headding p-4">
            <TemplateSubCatagoryModalAdd />
            {/* <a className="btn-danger rounded px-3 py-2 d-block text-center" href="javascript:void(0)" onClick={() => deleteCategory()}>Delete Category</a> */}
            <div className="pb-4">
              <div className="site-search">
                <div className="d-flex flex-wrap">
                  <div className="flex-grow-1 mr-2">
                    <div className="input-group">
                      <input type="text" placeholder="Search" className="form-control" name="searchText" value={searchText} onChange={ev => setSearchText(ev.target.value)} />
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
            <LinkFolders
              folders={subCatagoryByCatagory?.map(c => ({
                id: c.id,
                label: c.displayName,
                categoryId: c.catagoryId,
                linkTo: RoutesAppUi.Admin.TemplatesChoose.BySubCatagory.Load(c.id)
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}