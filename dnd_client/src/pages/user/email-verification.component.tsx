import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { RoutesAppApi } from "../../config";
import { AxiosAuth } from "../../core";
const queryString = require("query-string");

const EmailVerification = (props: any) => {
  const credential = queryString.parse(props.location.search);
  const initialValue: any = {
    token: credential.token,
    password: "",
    confirmPassword: "",
    userId: credential.userId,
  };
  let history = useHistory();
  const [formValue, setFormValue] = React.useState(initialValue);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleFormChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  React.useEffect(() => {
    setErrorMessage(null);
  }, [formValue]);

  const resetPassword = async (body: any) => {
    try {
      await AxiosAuth.post(RoutesAppApi.Auth.ResetPassword(), body);
      return true;
    } catch (error) {
      setErrorMessage("Failed to reset password")
      return false;
    }
  };

  const onSubmitForm = async () => {
    if(!formValue.password) {
      setErrorMessage("Password can't be empty");
      return;
    }
    if(formValue.password !== formValue.confirmPassword) {
      setErrorMessage("Password didn't match");
    } else {
      if (await resetPassword(formValue)) {
        history.push("/home");
      } else {
        setErrorMessage("Failed to reset password")
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className='col-md-4 col-sm-2 col-xs-2'></div>
        <div className="col-md-4 col-sm-10 col-xs-10 mt-5 mb-5">
          <h4 className='text-white'>Set new password</h4>
          <form className='text-white'>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValue.password}
                onChange={handleFormChange}
                className="form-control"
                placeholder="New Password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formValue.confirmPassword}
                onChange={handleFormChange}
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>
            <div className="mb-3">
              {errorMessage !== null ? (
                <div className="alert alert-danger mt-2" role="alert">
                  {errorMessage}
                </div>
              ): null}
            </div>
            <input type="button" className='btn btn-primary' onClick={onSubmitForm} value="Submit" />
          </form>
        </div>
        <div className='col-md-4 col-sm-2 col-xs-2'></div>
      </div>
    </div>
  );
};

export default withRouter(EmailVerification);
