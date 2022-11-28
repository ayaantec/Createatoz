import React from "react";
import { DomID, RoutesAppApi, RoutesAsset } from "../../../config";
import { AxiosAuth } from "../../../core";
import { BootstrapUtils } from "../../../utils";

export function EmailValidationModal(): JSX.Element {
  const inputRef: any = React.useRef(null);
  React.useEffect(() => {}, []);
  const [message, setMessage] = React.useState<string | null>(null);

  const emailVerification = async (email: string) => {
    try {
      setMessage(null);
      await AxiosAuth.post(RoutesAppApi.Auth.EmailVerification(), {
        email: email,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const emailValidation = async () => {
    const email = inputRef.current.value;
    if (await emailVerification(email)) {
      setMessage("Verification link has been sent, Please check your email");
    } else {
      setMessage("Can't send email");
    }
    setTimeout(() => {
      BootstrapUtils.ModalHideById(DomID.Modals.EmailValidation);
      setMessage(null);
      inputRef.current.value = '';
    }, 3000);
  };

  return (
    <div
      className="modal fade"
      id={DomID.Modals.EmailValidation}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="site-login-modalTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered site-modal-login"
        role="document"
      >
        <div className="modal-content py-3">
          <div className="modal-header mx-4">
            <h3 className="modal-title m-auto" id="login-modalTitle">
              Please enter your email
            </h3>
          </div>
          <div className="modal-body p-0 pt-3 px-4 ">
            <div className="input-group py-2">
              <div className="input-group-prepend">
                <span className="input-group-text p-0">
                  <img
                    className="img-fluid site-control-img"
                    src={RoutesAsset.Icons.Profile}
                    alt="profile-login"
                  />
                </span>
              </div>
              <input
                ref={inputRef}
                type="text"
                className="form-control ml-3"
                placeholder="Email"
              />
            </div>
            {message !== null ? (
              <div className="alert alert-info mt-2 mb-2" role="alert">
                {message}
              </div>
            ) : null}
          </div>
          <div className="modal-footer">
            <div className="d-block mx-auto">
              <a
                onClick={emailValidation}
                className="ml-auto login-btn py-2 px-4 cur-point"
                href="javascript:void(0)"
              >
                Submit
              </a>
            </div>
          </div>
          <div className="mx-auto d-flex py-3 signup-btn">
            <p>Don't have an account? </p>
            <a
              className="pl-2 cur-point"
              data-toggle="modal"
              data-target={BootstrapUtils.GetSelectorById(DomID.Modals.Signup)}
              onClick={() =>
                BootstrapUtils.ModalHideById(DomID.Modals.EmailValidation)
              }
            >
              SIGN UP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
