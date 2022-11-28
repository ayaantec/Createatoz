import React from "react";
import NavImage from "../../../assets/png/250X400.png";
import { AxiosAuth, useSelectorTyped } from "../../../core";
import axios from "axios";
import { DomID, RoutesAppApi } from "../../../config";
import { BootstrapUtils } from "../../../utils";
import { toast } from "react-toastify";
import { Spinner } from "../../../common";

const NavigationImageChangeModal = (props: any) => {
  const user = useSelectorTyped((state) => state.user);
  const navigationPhotoUrl = RoutesAppApi.NavigationPhoto.Root;
  const navigationSelectedPhotoUrl =
    RoutesAppApi.NavigationPhoto.GetSelectedPhoto;
  let navigationImageId = DomID.Modals.navigationImage;

  const [selectedPhoto, setSelectedPhoto] = React.useState(NavImage);
  const [isBusy, setIsBusy] = React.useState<boolean>(false);

  const getNavigationDefaultImage = async () => {
    try {
      const response = await axios.get(navigationSelectedPhotoUrl());
      if (response && response.data && response.data.url) {
        setSelectedPhoto(response.data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postNavigationPhoto = async (formData: any) => {
    setIsBusy(true);
    try {
      await AxiosAuth.post(navigationPhotoUrl(), formData);
      await getNavigationDefaultImage();
      toast.success("Successfully uploaded");
      setIsBusy(false);
      BootstrapUtils.ModalHideById(DomID.Modals.navigationImage);
    } catch (error) {
      toast.error("Failed to upload");
      setIsBusy(false);
    }
  };

  const changeNavigationPhoto = (event: any) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      var formData = new FormData();
      formData.append("Image", file);
      postNavigationPhoto(formData);
    }
  };

  React.useEffect(() => {
    getNavigationDefaultImage();
  });
  return (
    <>
      {user.isAdmin ? (
        <div className="sidebar-even-promotion">
        {/* <img className="img-fluid" src="https://draganddropresource.s3.amazonaws.com/cover_2bf174a1-a719-4188-8e82-d16607348002_event-poster-final-01.jpg" alt="" height="200px" width="200px"></img> */}
          <img
            className="img-fluid"
            data-toggle="modal"
            data-target={BootstrapUtils.GetSelectorById(navigationImageId)}
            src={selectedPhoto}
            alt="nav"
          />
        </div>
      ) : (
        <div className="sidebar-even-promotion">
          <img className="img-fluid" src={selectedPhoto} alt="nav" />
        </div>
      )}

      <div
        className="modal fade"
        id={navigationImageId}
        role="dialog"
        aria-labelledby="banner-changer-modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body px-0 pb-0">
              <div className="row">
                <div className="col-12 mx-auto text-center">
                  <div className="p-3">
                    <div className="py-2">
                      <p>Navigation Photo</p>
                      <label
                        htmlFor="navigationPhoto"
                        className="cur-point site-border-bottom site-border-top w-100 py-2"
                      >
                        Change Navigation Photo
                      </label>
                      {isBusy ? (
                        <Spinner />
                      ) : (
                        <input
                          className="d-none"
                          type="file"
                          id="navigationPhoto"
                          accept=".image, .png, .jpg, .jpeg, , .svg"
                          onChange={(e) => {
                            changeNavigationPhoto(e);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationImageChangeModal;
