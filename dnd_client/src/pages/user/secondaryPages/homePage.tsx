import React from "react";
import { Link } from "react-router-dom";
import { RoutesAppUi } from "../../../config";
import { ApiHooks, AxiosAuth, useSelectorTyped } from "../../../core";
import { BannerChangerModal } from "../modals";
import MyDesign from "../../design/components/MyDesign";
import CustomLoader from "../../../common/CustomLoader";
import { RoutesAppApi } from "../../../config";
import {
  useFunctionalityHomePage,
  UseFunctionalityShowTemplate,
} from "./hooks";
import image from '../../../assets/png/underConstruction.jpg'
import defaultImg from '../../../assets/default-thumbnail.jpg'

type TypeDesignResponses = {
  thumbnailUrl: string;
  id: number
}

export function PageHome(): JSX.Element {
  const {
    homePageData,
    setSelectedGroup,
    selectedGroup,
    categories,
    setCategories,
  } = useFunctionalityHomePage();

  const isLoggedIn = useSelectorTyped((state) => state.user.isLoggedIn);
  const [busy, setBusy] = React.useState<boolean>(false)


  const { data: categoryData } =
    ApiHooks.Admin.Templates.GetTemplateCatagoy.useHook();
  const [designResponses, setDesignResponses] =
    React.useState<TypeDesignResponses[]>();

  const getAllDesign = async () => {
    setBusy(true)
    try {
      const response = await AxiosAuth.get(
        RoutesAppApi.Design.thumbnails()
      );
      const designData = response.data;
      setDesignResponses(designData.reverse());
      setBusy(false)
    } catch (error) {
      setBusy(false)
    }
  };

  let myDesignElement: any;
  let firstBlock: any[]=[], secondBlock: any[]=[], thirdBlock: any[]=[], fourthBlock: any[]=[];
  if(designResponses && designResponses?.length !== 0){
    let lengthOfDesignResponses = designResponses.length 
    for (let i=0; i<lengthOfDesignResponses; i+=4){
      for(let j=0; j<4; j++){
        if(j===0 && designResponses[i+0] !== undefined){
          firstBlock.push(
            <a target='_blank' href={RoutesAppUi.Design.WithTemplate.Load(designResponses[i+0]?.id)}> 
              <img className="page-thumb my-design-thumb" src={designResponses[i+0]?.thumbnailUrl!==null ? designResponses[i+0]?.thumbnailUrl : defaultImg} alt="preview" />
            </a>
          )
        } else if(j===1 && designResponses[i+1] !== undefined){
          secondBlock.push(
              <a target='_blank' href={RoutesAppUi.Design.WithTemplate.Load(designResponses[i+1]?.id)}> 
                <img className="page-thumb my-design-thumb" src={designResponses[i+1]?.thumbnailUrl!==null ? designResponses[i+1]?.thumbnailUrl : defaultImg} alt="preview" />
              </a>
            )
        } else if(j===2 && designResponses[i+2] !== undefined){
          thirdBlock.push(
              <a target='_blank' href={RoutesAppUi.Design.WithTemplate.Load(designResponses[i+2]?.id)}> 
                <img className="page-thumb my-design-thumb" src={designResponses[i+2]?.thumbnailUrl!==null ? designResponses[i+2]?.thumbnailUrl : defaultImg} alt="preview" />
              </a>
            )
        } else if(j===3 && designResponses[i+3] !== undefined){
          fourthBlock.push(
              <a target='_blank' href={RoutesAppUi.Design.WithTemplate.Load(designResponses[i+3]?.id)}> 
                <img className="page-thumb my-design-thumb" src={designResponses[i+3]?.thumbnailUrl!==null ? designResponses[i+3]?.thumbnailUrl : defaultImg} alt="preview" />
              </a>
            )
        }
      }
    }
    myDesignElement = (
      <>
        <div className="mb-2 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 w-100">
          {firstBlock}
        </div>
        <div className="mb-2 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 w-100">
          {secondBlock}
        </div>
        <div className="mb-2 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 w-100">
          {thirdBlock}
        </div>
        <div className="mb-2 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 w-100">
          {fourthBlock}
        </div>
      </>
    )
  }

  return (
    <div className="container-fluid">
      <div>
        <div className="custom-shadow site-main-content-body">
          <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0">
            <div className="md-border-radious overflow-hidden mb-3 site">
              <div className="row">
                <div className="col-12">
                  <BannerChangerModal type="Home" />
                </div>
              </div>
            </div>

            <div className="md-border-radious overflow-hidden gry-bg">
              <div className="row">
                <div className="col-12">
                  <div className="py-3 px-3">
                    <div className="d-flex site-contetn-nav-links">
                      <ul
                        className="nav nav-tabs  flex-grow-1"
                        id="myTab"
                        role="tablist"
                      >

                        {homePageData.map((data) =>
                          data.displayName === "MyDesigns" ? (
                            isLoggedIn ? (
                              <li className="nav-item " key={data.id}>
                                <a
                                  className="nav-link"
                                  id={data.displayName}
                                  data-toggle="tab"
                                  href="javascript:void(0)"
                                  role="tab"
                                  aria-controls="home"
                                  aria-selected="true"
                                  onClick={() => {
                                    setSelectedGroup(data.name);
                                    setCategories(data.categories);
                                    console.log(
                                      "selected group: ",
                                      data.name,
                                      "Selected category: ",
                                      data.categories
                                    );
                                    console.log(
                                      "clicked on my design-",
                                      selectedGroup
                                    );

                                    getAllDesign();
                                  }}
                                >
                                  My Designs
                                  {/* {data.displayName} */}
                                </a>
                              </li>
                            ) : null
                          ) : data.displayName === "Social Media" ? (
                            <li className="nav-item " key={data.id}>
                              <a
                                className="nav-link"
                                id={data.displayName}
                                data-toggle="tab"
                                href="javascript:void(0)"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                                onClick={() => {
                                  setSelectedGroup(data.name);
                                  setCategories(data.categories);
                                }}
                              >
                                {data.displayName}
                              </a>
                            </li>
                          ) : (
                            <li className="nav-item " key={data.id}>
                              <a
                                className="nav-link "
                                id={data.displayName}
                                data-toggle="tab"
                                href="javascript:void(0)"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                                onClick={() => {
                                  setSelectedGroup(data.name);
                                  setCategories(data.categories);
                                }}
                              >
                                {data.displayName}
                              </a>
                            </li>
                          )
                        )}
                        <li className="nav-item ">
                          <a
                            className="nav-link "
                            data-toggle="tab"
                            href="javascript:void(0)"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                            onClick={() => {
                              setSelectedGroup('EBook');
                              setCategories([])
                            }}
                          >
                            E-Book
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="my-3">
                          <div className="row flex-row flex-nowrap overflow-auto-hover pb-2">
                            {selectedGroup === "MyDesigns" ? (
                              busy ? <CustomLoader /> :
                                designResponses &&
                                  designResponses.length > 0 ? (
                                  <div className="row ml-2 mr-2">
                                    {myDesignElement}
                                  </div>
                                ) : null
                            ) : categories === undefined ? (
                              categoryData?.map((index) => (
                                <div
                                  key={index.id}
                                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 d-flex w-100"
                                >
                                  {console.log("index here --", index)}

                                  <div className="content-card-with-sm-banner">
                                    <div className="content-card-with-sm-banner-banner-img">
                                      <img
                                        className="img-fluid"
                                        src={index.coverPhotoUrl}
                                        alt=""
                                        height="200px"
                                        width="200px"
                                      />
                                    </div>
                                    <div className="p-3 content-card-with-sm-banner-banner-content">
                                      <h2 className="pb-2">
                                        {index.displayName}{" "}
                                      </h2>
                                      <div className="row">
                                        {index.subCatagories?.map(
                                          (subcategory) => (
                                            <div
                                              className="col-6  mb-3"
                                              key={subcategory.id}
                                            >
                                              <Link
                                                to={RoutesAppUi.Templates.BySubCatagory.Load(
                                                  String(subcategory.id)
                                                )}
                                              >
                                                <div className="content-thumb-ctl">
                                                  <div className="content-thumb-image">
                                                    <img
                                                      className="img-fluid"
                                                      src={
                                                        subcategory.thumbNailUrl
                                                      }
                                                      alt=""
                                                      height="100px"
                                                      width="100px"
                                                    />
                                                  </div>
                                                  <div className="content-thumnb-info p-2 mb-3">
                                                    <h3 className="mb-0">
                                                      {subcategory.displayName}
                                                    </h3>
                                                    <p className="mb-0 gry-text">
                                                      {subcategory.width}x
                                                      {subcategory.height} px
                                                    </p>
                                                  </div>
                                                </div>
                                              </Link>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              categories?.map((category) =>
                                category.name === "MyDesigns" ? (
                                  <div>hi </div>
                                ) : (
                                  <div
                                    key={category.id}
                                    className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 d-flex w-100"
                                  >
                                    <div className="content-card-with-sm-banner">
                                      <div className="content-card-with-sm-banner-banner-img">
                                        <img
                                          className="img-fluid"
                                          src={category.coverPhotoUrl}
                                          alt=""
                                          height="200px"
                                          width="200px"
                                        />
                                      </div>

                                      <div className="p-3 content-card-with-sm-banner-banner-content">
                                        <h2 className="pb-2">
                                          {category.name}{" "}
                                        </h2>
                                        <div className="row">
                                          {category.subCategories.map(
                                            (subCategory) => (
                                              <div
                                                className="col-6  mb-3"
                                                key={subCategory.id}
                                              >
                                                {console.log(
                                                  "sub category data",
                                                  subCategory.name
                                                )}
                                                <Link
                                                  to={RoutesAppUi.Templates.BySubCatagory.Load(
                                                    String(subCategory.id)
                                                  )}
                                                >
                                                  <div className="content-thumb-ctl">
                                                    <div className="content-thumb-image">
                                                      <img
                                                        className="img-fluid"
                                                        src={
                                                          subCategory.thumbNailUrl
                                                        }
                                                        alt=""
                                                        height="100px"
                                                        width="100px"
                                                      />
                                                    </div>
                                                    <div className="content-thumnb-info p-2 mb-3">
                                                      <h3 className="mb-0">
                                                        {subCategory.name}
                                                      </h3>
                                                      <p className="mb-0 gry-text">
                                                        {subCategory.width}x
                                                        {subCategory.height} px
                                                      </p>
                                                    </div>
                                                  </div>
                                                </Link>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )
                            )}
                            {selectedGroup === 'EBook' && <img alt='Under Construction' src={image} />}
                          </div>
                          <div className="row flex-row flex-nowrap overflow-auto-hover pb-2"></div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        ...
                      </div>
                      <div
                        className="tab-pane fade"
                        id="contact"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                      >
                        ...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedGroup === "" || selectedGroup === null ? (
              <div className="md-border-radious overflow-hidden gry-bg mt-3">
                <div className="mb-2">
                  {
                    <div>
                      {categoryData?.map((index) => (
                        <div key={index.id}>
                          {index.subCatagories?.map((subcategory) => {
                            return (
                              <div className="mb-2" key={subcategory.id}>
                                <div className="py-3 px-3 d-flex">
                                  <h2 className="mb-0 blue-text flex-grow-1 my-auto">
                                    {subcategory.displayName}
                                    {console.log(
                                      "subcateogu ",
                                      subcategory.displayName
                                    )}
                                  </h2>
                                </div>
                                <div className="px-3">
                                  <UseFunctionalityShowTemplate
                                    id={String(subcategory.id)}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  }
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
