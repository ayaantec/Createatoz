/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { AssetsSvg } from "../../../assets";
import { RoutesAppUi } from "../../../config";
import { useFunctionalityAddUser } from "./hooks";
import { BootstrapUtils } from "../../../utils/bootstrap";
import { DomID } from "../../../config/constants";
import { UserDeleteModal } from "../../user/modals/userDeleteModal";
import { useDispatch } from "react-redux";
import { ActionsUser } from "../../../core/redux/slice/user";
import InfiniteScroll from "react-infinite-scroll-component";

export function PageAdminAllUsers(): JSX.Element {
  const { searchText, setSearchText, users } = useFunctionalityAddUser();

  const dispatch = useDispatch();

  const [usersSumData, setUsersSumData] = React.useState<any[]>([]);
  const [data, setData] = React.useState<any[]>([]);
  const [end, setEnd] = React.useState<number>(0);
  const [hasMoreData, setHasMoreData] = React.useState<boolean>(false);

  const offset = 30;
  const initialUsersDataSplit = (user: any) => {
    if (user && user.length > 0) {
      let userData = user;
      const reverseData = userData.reverse();
      setData(reverseData);
      setUsersDataForLoading(offset, reverseData);
    }
  };

  const setUsersDataForLoading = (endPoint: number, list: any) => {
    if(endPoint <= list.length) {
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
    setUsersSumData(list.slice(0, endPoint));
    setEnd(endPoint + offset);
  };

  const fetchMoreData = () => {
    setUsersDataForLoading(end, data);
  };

  React.useEffect(() => {
    if (users && users.length > 0) {
      initialUsersDataSplit(users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);
  return (
    <div className="container-fluid gry-bg">
      <div className=" py-3">
        <div className="white-bg custom-shadow site-main-content-body">
          <div>
            <div className="row">
              <div className="col-12">
                <div className="px-4 pt-4">
                  <h1 className="pb-2">All Users</h1>
                </div>
              </div>
            </div>
          </div>
          <div
            className="site-content-without-headding p-4"
            id="allUsers-scroll-parent"
          >
            <InfiniteScroll
              dataLength={usersSumData.length}
              next={fetchMoreData}
              hasMore={hasMoreData}
              scrollableTarget="allUsers-scroll-parent"
              className="pt-2"
              loader={<h3 className='text-white pt-2'>Fetching more items...</h3>}
            >
              <div>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-4">
                    <div>
                      <Link
                        className="site-primary-btn px-3 py-2 text-center"
                        to={RoutesAppUi.Admin.AddUsers.Root()}
                      >
                        Add new Collaborator
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
              <div className="pb-4">
                <p className="gry-text">All Users</p>
                <div>
                  <div>
                    <div className="site-table">
                      <table className="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col" className="text-right">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {usersSumData.map((user) =>
                            user.isActive ? (
                              <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.userRoles[0].role.name}</td>
                                <td className="text-right">
                                  {/* <span className="p-1">
                                <a href="javascript:void(0)">
                                  <span>
                                    <AssetsSvg.AdminEdit />
                                  </span>
                                </a>
                              </span> */}
                                  <span
                                    className="p-1"
                                    data-toggle="modal"
                                    data-target={BootstrapUtils.GetSelectorById(
                                      DomID.Modals.DeleteUser
                                    )}
                                    onClick={() => {
                                      dispatch(
                                        ActionsUser.SetSelectedUser({
                                          id: user.id,
                                          name: user.name,
                                        })
                                      );
                                    }}
                                  >
                                    <a href="javascript:void(0)">
                                      <span>
                                        <AssetsSvg.AdminDelete />
                                      </span>
                                    </a>
                                  </span>
                                  {/* <span className="p-1">
                                <a href="javascript:void(0)">
                                  <span>
                                    <AssetsSvg.AdminBlock />
                                  </span>
                                </a>
                              </span> */}
                                </td>
                              </tr>
                            ) : null
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <div className="border-top">
                <nav aria-label="Page navigation example ">
                  <ul className="pagination my-3">
                    <li className="page-item ml-auto">
                      <a className="page-link" href="javascript:void(0)" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="javascript:void(0)">1</a></li>
                    <li className="page-item"><a className="page-link" href="javascript:void(0)">2</a></li>
                    <li className="page-item"><a className="page-link" href="javascript:void(0)">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="javascript:void(0)" aria-label="Next">
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div> */}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>

      <UserDeleteModal />
    </div>
  );
}
