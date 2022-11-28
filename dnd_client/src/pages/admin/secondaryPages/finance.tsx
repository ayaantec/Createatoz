import React from 'react';
import { AssetsPng, AssetsSvg } from '../../../assets';

export function PageAdminFinance(): JSX.Element {
  return (
    <div className="container-fluid gry-bg">
      <div className=" py-3">
        <div className="white-bg custom-shadow site-main-content-body">
          <div>
            <div className="row">
              <div className="col-12">
                <div className="px-4 pt-4">
                  <h1 className="pb-2">Finance</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="site-content-without-headding p-4">
            <div>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-4">
                  <div className="d-flex white-bg custom-shadow py-2 px-3 sm-border-radious dashbord-contents">
                    <div className="flex-shrink-0 mr-3 ">
                      <img className="img-fluid dashbord-icons" src={AssetsPng.TotalIncome} alt="" />
                    </div>
                    <div className="my-auto">
                      <h2>$3249</h2>
                      <p className="mb-0 gry-text">Total-revenue</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            <div className="pb-4">
              <div>
                <div>
                  <div className="site-table">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Invoice</th>
                          <th scope="col">From</th>
                          <th scope="col">To</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Account Type</th>
                          <th scope="col">Account Status</th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Muntashir</td>
                          <td>Muntashir@gmail.com</td>
                          <td>INV 08704</td>
                          <td>October 27, 2020</td>
                          <td>October 27, 2020</td>
                          <td>$100.00</td>
                          <td>Free</td>
                          <td>Active</td>
                          <td><a href="javascript:void(0)"><span className="table-account-status-red py-1 px-2">Deactive</span></a></td>
                          <td>
                            <a href="javascript:void(0)">
                              <span>
                                <AssetsSvg.AdminDownload />
                              </span>
                            </a>
                          </td>
                          <td>
                            <a href="javascript:void(0)">
                              <span>
                                <AssetsSvg.AdminMail />
                              </span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Salam</td>
                          <td>Salam@gmail.com</td>
                          <td>INV 0870124</td>
                          <td>October 27, 2020</td>
                          <td>October 27, 2020</td>
                          <td>$100.00</td>
                          <td>Free</td>
                          <td>Active</td>
                          <td><a href="javascript:void(0)"><span className="table-account-status-green py-1 px-2">Active</span></a></td>
                          <td>
                            <a href="javascript:void(0)">
                              <span>
                                <AssetsSvg.AdminDownload />
                              </span>
                            </a>
                          </td>
                          <td>
                            <a href="javascript:void(0)">
                              <span>
                                <AssetsSvg.AdminMail />
                              </span>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="border-top">
                <nav aria-label="Page navigation example ">
                  <ul className="pagination my-3">
                    <li className="page-item ml-auto">
                      <a className="page-link" href="javascript:void(0)" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="javascript:void(0)">1</a></li>
                    <li className="page-item"><a className="page-link" href="javascript:void(0)">2</a></li>
                    <li className="page-item"><a className="page-link" href="javascript:void(0)">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="javascript:void(0)" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}