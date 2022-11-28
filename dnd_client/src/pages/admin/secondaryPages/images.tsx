/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { AssetsSvg } from "../../../assets";
import { AxiosAuth, useSelectorTyped } from "../../../core";
import { AddModal } from "../modals";
import { useFunctionalityImagesChoose } from "./hooks";
import { UserModalImageDownload } from "../../../../src/pages/user/modals";
import { BootstrapUtils } from "../../../utils";
import { DomID, offset, RoutesAppApi, RoutesAppUi } from "../../../config";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { TypeImageData } from "../../../models";
import { DeleteModal } from "../modals/deleteModal";

export function PageAdminImages(): JSX.Element {
  const [imageId, setImageId] = React.useState<string | undefined>();
  const { searchText, setSearchText, images } = useFunctionalityImagesChoose();

  const [selectedFile, setSelectedFile] = React.useState([] as any);
  const [selectedName, setSelectedName] = React.useState("");
  const [price, setPrice] = React.useState(Number);
  const [costtype, setCostType] = React.useState(Number);
  const [ID, setID] = React.useState(String);
  const isAdmin = useSelectorTyped((state) => state.user.isAdmin);
  const isCollaborator = useSelectorTyped((state) => state.user.isCollaborator);
  const userProfile = useSelectorTyped((state) => state.user.profile);
  const [userId, setUserID] = React.useState(Boolean);

  const [imageSumData, setImageSumData] = React.useState<TypeImageData[]>([]);
  const [data, setData] = React.useState<TypeImageData[]>([]);
  const [end, setEnd] = React.useState<number>(0);
  const [hasMoreData, setHasMoreData] = React.useState<boolean>(false);

  const initialImageDataSplit = (image: TypeImageData[] | undefined) => {
    if (image && image.length >= 0) {
      const reverseData = image.reverse();
      setData(reverseData);
      setImageDataForLoading(offset, reverseData);
    }
  };

  const setImageDataForLoading = (endPoint: number, list: TypeImageData[]) => {
    if (endPoint <= list.length) {
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
    setImageSumData(list.slice(0, endPoint));
    setEnd(endPoint + offset);
  };

  const fetchMoreData = () => {
    setImageDataForLoading(end, data);
  };

  React.useEffect(() => {
    if (images && images.length >= 0) {
      initialImageDataSplit(images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);



  const deleteImage =(imageId: any) =>{
    let reloadImages;
    console.log("deleted ID ",imageId)
    AxiosAuth.delete(RoutesAppApi.Image.Root()+"/"+imageId)
    .then(r => {
      console.log("success")
      console.log(r.data)

      reloadImages = imageSumData.filter(img =>{
        return img.id !== imageId
      })
      setImageSumData(reloadImages)
      BootstrapUtils.ModalHideById("myModal");
      
    })
    .catch(e =>{
      console.log("failed")
    })
    BootstrapUtils.ModalHideById("myModal");
    console.log("Deleted-",imageId)
  } 
    return (
    <>
      <UserModalImageDownload
        fileUrl={selectedFile}
        filename={selectedName}
        priceamount={price}
        costtype={costtype}
        userID={userId}
        id={ID}
        type="image"
      />

      {isAdmin || isCollaborator ? null : (
        <div className="md-border-radious overflow-hidden gry-bg mb-3">
          <div className="p-3 d-flex">
            <Link to={RoutesAppUi.Discover.Root}>
              <a className="cur-point" href="javascript:void(0)">
                <p className="mb-0 blue-text mr-2">Discover</p>
              </a>
            </Link>
            <p className="mb-0 mr-2">&gt;</p>
            <a>
              <p className="mb-0 blue-text mr-2 font-weight-bold">
                {" "}
                All Images{" "}
              </p>
            </a>
          </div>
        </div>
      )}

      <div className="container-fluid gry-bg ">
        <div className=" py-3">
          <div className="white-bg custom-shadow site-main-content-body">
            {/* page headding */}
            <div>
              <div className="row">
                <div className="col-12">
                  <div className="px-4 pt-4">
                    <h1 className="pb-2">Images</h1>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                className="site-content-without-headding p-4"
                id="images-scroll-parent"
              >
                <InfiniteScroll
                  dataLength={imageSumData.length}
                  next={fetchMoreData}
                  hasMore={hasMoreData}
                  scrollableTarget="images-scroll-parent"
                  className="pt-2"
                  loader={<h3 className='text-white pt-2'>Fetching more items...</h3>}
                >
                  {isAdmin || isCollaborator ? <AddModal type="Image" /> : null}
                  {isAdmin || isCollaborator ? <DeleteModal type='Image' id={imageId}/> : null}
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
                  <div className="mb-3 py-1 site-border-top site-border-bottom d-none d-none">
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
                      {/* <h1> preview images {images} </h1> */}
                      {imageSumData.map((img) =>
                        isAdmin || isCollaborator ? (
                          <div
                            key={img.id}
                            className="template-ctl mb-3"
                          >
                            <div className="font-admin-ctl">
                              <div className="template-view">
                                <img
                                  className="img-fluid"
                                  src={img.imageThumbUrl}
                                  alt={img.displayName}
                                />
                              </div>
                              <div className="row py-2 px-1">
                                <div className="col-7">
                                  <div className="p-2 px-3 content-name">
                                    <p className="mb-0 font-weight-bold ">{img.displayName}</p>
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
                                    onClick={() => setImageId(img.id)}
                                    >
                                      <button className="secondary-btn-link px-2 py-1 text-center btn-sm">Delete</button>
                                    </div>
                                  </div>
                              </div>
                            </div>
                          </div>
                        ) : img.prices[0] !== undefined ? (
                          <div
                            key={img.id}
                            className="template-ctl"
                            onClick={() => {
                              setSelectedFile(img.imgUrlProxy);
                              if (userProfile) {
                                console.log(
                                  "logged in user : ",
                                  userProfile.name
                                );
                                console.log(
                                  img.users,
                                  "logged in user : ",
                                  userProfile.id,
                                  "found image : ",
                                  img.users.find((user) =>
                                    user.userId.includes(userProfile.id)
                                  )
                                );

                                if (
                                  img.users.find((user) =>
                                    user.userId.includes(userProfile.id)
                                  )?.userId === userProfile.id
                                ) {
                                  console.log(
                                    img.users,
                                    "logged in user : ",
                                    userProfile.id
                                  );
                                  setUserID(false);
                                } else {
                                  setUserID(true);
                                }
                              }

                              setSelectedName(img.displayName);
                              setCostType(img.costType);
                              setPrice(img.prices[0].value);
                              setID(img.id);
                            }}
                          >
                            <a
                              data-toggle="modal"
                              data-target={BootstrapUtils.GetSelectorById(
                                DomID.Modals.ViewImageDownload
                              )}
                            >
                              <div className="templets-view">
                                <img
                                  className="img-fluid"
                                  src={img.imageThumbUrl}
                                  alt={img.displayName}
                                />
                                {/* <label>{userProfile?.id}</label> */}
                              </div>
                            </a>
                          </div>
                        ) : (
                          <div
                            key={img.id}
                            className="template-ctl"
                            onClick={() => {
                              setSelectedFile(img.imgUrlProxy);
                              setSelectedName(img.displayName);
                              setCostType(img.costType);
                              setPrice(0);
                              setID(img.id);
                            }}
                          >
                            <a
                              data-toggle="modal"
                              data-target={BootstrapUtils.GetSelectorById(
                                DomID.Modals.ViewImageDownload
                              )}
                            >
                              <div className="templets-view">
                                <img
                                  className="img-fluid"
                                  src={img.imageThumbUrl}
                                  alt={img.displayName}
                                />
                              </div>
                            </a>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </InfiniteScroll>
              </div>
            </div>

            {/* folder items */}
          </div>
        </div>
      </div>
      {/* <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <AddModal type="Image" />
      </div> */}
    </>
  );
}

