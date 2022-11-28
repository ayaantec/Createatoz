import React from "react";
import { Spinner } from "../../../common";
import { DomID } from "../../../config/constants";
import { useSelectorTyped } from "../../../core/redux/ReduxStore";
import { useFunctionalityAddUser } from "../../admin/secondaryPages/hooks/functionalityAddUser";
import { BootstrapUtils } from '../../../utils/bootstrap';

export function UserDeleteModal(): JSX.Element {
  const selectedUser = useSelectorTyped((state) => state.user.selectedUser);

  const { state, onUserDelete } = useFunctionalityAddUser();

  return (
    <div
      className="modal fade"
      id={DomID.Modals.DeleteUser}
      role="dialog"
      aria-labelledby="delete-user-modalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body px-0 pb-0">
            <div className="row">
              <div className="col-12 mx-auto text-center">
                <div className="p-3">
                  <div className="py-2">
                    Are you sure you want to delete user: {selectedUser?.name}?
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="site-primary-btn px-3 py-2 mr-2 text-center ml-auto mr-2"
                      onClick={() => {
                        if (selectedUser !== undefined)
                          onUserDelete(selectedUser.id);
                      }}
                    >
                      {state.isBusy ? (
                        <Spinner fillHtmlCode="#FFFFFF" />
                      ) : (
                        "Yes"
                      )}
                    </button>
                    <button className="secondary-btn px-3 py-2 text-center mr-auto ml-2" onClick={() => BootstrapUtils.ModalHideById(DomID.Modals.DeleteUser)}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
