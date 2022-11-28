import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { RoutesAppApi, RoutesAppUi, DomID } from '../config';
import { DragAndDropAppDispatch, DragAndDropStore } from '../core/redux/ReduxStore';
import { PrivateRouteLayout } from '../pages';
import { PublicRouteLayout } from '../pages';
import { PageNotFound } from '../pages/404';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosAuth, ActionsUser, AppLocalStorage } from '../core';
import { ApiSchemaProfileData } from '../models';
import EmailVerification from '../pages/user/email-verification.component';
import EmailConfirmation from '../pages/user/email-confirmation.component';
import NavImage from "../assets/png/250X400.png";
import axios from "axios";
import { BootstrapUtils } from "../utils";
import { Spinner } from "../common";

toast.configure({
  position: toast.POSITION.TOP_CENTER,
  autoClose: 2000,
});

function AppWithRouting() {
  const dispatch: DragAndDropAppDispatch = useDispatch();
  React.useEffect(() => {
    if (!AppLocalStorage.AccessToken) return;
    AxiosAuth.get<ApiSchemaProfileData>(RoutesAppApi.Profile.Root()).then(r => {
      if (r.status === 200 && !!r.data) {
        dispatch(ActionsUser.SetProfile(r.data));
      } else {
        dispatch(ActionsUser.SetIsLoggedIn(false));
      }
    });
  },
    // eslint-disable-next-line
    [],
  );
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from={RoutesAppUi.Root} to={RoutesAppUi.Home.Root} />
        <Route path="/(home|sharedWithMe|templates|discover|learn|pricing|brandKit|team|trash|all-works|all-image|all-audio|all-video|payment-success|payment-failed)" component={PublicRouteLayout} />
        <Route path="/(design|admin)" component={PrivateRouteLayout} />
        <Route path="/(email-verification)" component={EmailVerification} />
        <Route path="/(email-confirmation)" component={EmailConfirmation} />
        <Route path="**" component={PageNotFound} />

      </Switch>
    </BrowserRouter>
  );
}

export function App(props: React.PropsWithChildren<{}>): JSX.Element {
  // Dynamic background change modal section
  const backgroundPhotoUrl = RoutesAppApi.Image.UpdateBackgroundImage;
  const backgroundSelectedPhotoUrl = RoutesAppApi.Image.GetBackgroundImage;
  let backgroundImageId = DomID.Modals.backgroundImage;

  const [selectedPhoto, setSelectedPhoto] = React.useState(NavImage);
  const [count, setCount] = React.useState(0);
  const [isBusy, setIsBusy] = React.useState<boolean>(false);

  const getNavigationDefaultImage = async () => {
    try {
      const response = await axios.get(backgroundSelectedPhotoUrl());
      if (response && response.data) {
        setSelectedPhoto(response.data);
        setCount((prev) => prev +1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postNavigationPhoto = async (formData: any) => {
    setIsBusy(true);
    try {
      await AxiosAuth.post(backgroundPhotoUrl(), formData);
      await getNavigationDefaultImage();
      toast.success("Successfully uploaded");
      setIsBusy(false);
      BootstrapUtils.ModalHideById(DomID.Modals.backgroundImage);
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
  }, [selectedPhoto]);
  // Dynamic background change modal section end
  
  return (
    <Provider store={DragAndDropStore}>
      <div className='dynamic-bg' style={{background: `url(${selectedPhoto}?count=${count})`}}>
        <AppWithRouting />
        {/* Background image change modal start */}
        <div
          className="modal fade"
          id={backgroundImageId}
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
                        <p>Background Photo</p>
                        <label
                          htmlFor="backgroundPhoto"
                          className="cur-point site-border-bottom site-border-top w-100 py-2"
                        >
                          Change Background Photo
                        </label>
                        {isBusy ? (
                          <Spinner />
                        ) : (
                          <input
                            className="d-none"
                            type="file"
                            id="backgroundPhoto"
                            accept='.image, .png, .jpg, .jpeg, .svg'
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
      </div>
    </Provider>
  );
}