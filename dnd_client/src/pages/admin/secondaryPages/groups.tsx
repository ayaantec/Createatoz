import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { AssetsSvg } from '../../../assets';
import { RoutesAppApi, RoutesAppUi } from '../../../config';
import { ApiHooks } from '../../../core';
import { LinkFolders } from './components';

export function PageAdminTemplateGroups(): JSX.Element {
  const { data: groupData } = ApiHooks.Admin.Group.GetAllGroups.useHook();

  return (
    <div className="container-fluid gry-bg">
      <div className=" py-3">
        <div className="white-bg custom-shadow site-main-content-body">
          {/* page headding */}
          <div>
            <div className="row">
              <div className="col-12">
                <div className="px-4 pt-4 d-flex">
                  <h1 className="pb-2 mb-0 flex-grow-1 my-auto">All Groups</h1>
                </div>
              </div>
            </div>
          </div>
          {/* page headding */}
          <div className="site-content-without-headding p-4">
            <div className="pb-4">
              <div className="site-search">
                <div className="d-flex flex-wrap">
                  <div className="flex-grow-1 mr-2">
                    <div className="input-group">
                      <input type="text" placeholder="Search" className="form-control" name="searchText" />
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
              <LinkFolders
                folders={groupData?.map(g => ({
                  id: g.id,
                  label: g.displayName,
                  linkTo: RoutesAppUi.Admin.Category.ByGroup.Load(g.id),
                }))} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}