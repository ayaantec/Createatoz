import { toast } from "react-toastify";
import { TypeUserData } from "./../../../../models/users/userData";
import { BootstrapUtils } from "./../../../../utils/bootstrap";
import useSWR, { mutate } from "swr";
import React from "react";
import { RoutesAppApi } from "../../../../config";
import { AxiosAuth } from "../../../../core";
import { DomID } from "../../../../config/constants";

interface registerCollaboratorModel {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  permissions: number[];
  password: string;
  isActive?: true;
  package?: string;
  designation?: string;
}

type ComponentState = {
  username: string;
  email: string;
  phoneNumber: string;
  designation: string;
  permission: number[];
  password: string;
  isBusy: boolean;
};

type ComponentAction =
  | { type: "setUsername"; payload: string | undefined }
  | { type: "setEmail"; payload: string | undefined }
  | { type: "setPhoneNumber"; payload: string | undefined }
  | { type: "setDesignation"; payload: string | undefined }
  | { type: "setPermission"; payload: number[] | undefined }
  | { type: "setPassword"; payload: string | undefined }
  | { type: "reset" }
  | { type: "setIsBusy" }
  | { type: "setIsNotBusy" };

type TypeComponentReducer = React.Reducer<ComponentState, ComponentAction>;

const ComponentReducer: TypeComponentReducer = (state, action) => {
  switch (action.type) {
    case "setUsername":
      return { ...state, username: action.payload ?? "" };
    case "setEmail":
      return { ...state, email: action.payload ?? "" };
    case "setPhoneNumber":
      return { ...state, phoneNumber: action.payload ?? "" };
    case "setDesignation":
      return { ...state, designation: action.payload ?? "" };
    case "setPermission":
      return { ...state, permission: action.payload ?? [] };
    case "setPassword":
      return { ...state, password: action.payload ?? "" };
    case "reset":
      return { ...state, isBusy: false };
    case "setIsBusy":
      return { ...state, isBusy: true };
    case "setIsNotBusy":
      return { ...state, isBusy: false };
    default:
      return state;
  }
};

export function useFunctionalityAddUser() {
  const userUrl = RoutesAppApi.User.GetUser();
  const { data: apiUserData } = useSWR<TypeUserData>(userUrl, () =>
    AxiosAuth.get(userUrl).then((r) => r.data)
  );

  const [state, stateDispatch] = React.useReducer<TypeComponentReducer>(
    ComponentReducer,
    {
      username: "",
      email: "",
      phoneNumber: "",
      designation: "",
      permission: [],
      password: "",
      isBusy: false,
    }
  );

  React.useEffect(() => {
    const resetGroupSelection = () => {
      stateDispatch({ type: "reset" });
    };
    $(BootstrapUtils.GetSelectorById("common_modal")).on(
      "hidden.bs.modal",
      resetGroupSelection
    );
    return () => {
      $(BootstrapUtils.GetSelectorById("common_modal")).off(
        "hidden.bs.modal",
        resetGroupSelection
      );
    };
  });

  const setUsername = React.useCallback(
    (text?: string) => stateDispatch({ type: "setUsername", payload: text }),
    []
  );
  const setEmail = React.useCallback(
    (text?: string) => stateDispatch({ type: "setEmail", payload: text }),
    []
  );
  const setPhoneNumber = React.useCallback(
    (text?: string) => stateDispatch({ type: "setPhoneNumber", payload: text }),
    []
  );
  const setDesignation = React.useCallback(
    (text?: string) => stateDispatch({ type: "setDesignation", payload: text }),
    []
  );
  const setPermission = React.useCallback(
    (permission?: number[]) =>
      stateDispatch({ type: "setPermission", payload: permission }),
    []
  );
  const setPassword = React.useCallback(
    (text?: string) => stateDispatch({ type: "setPassword", payload: text }),
    []
  );

  function onUserAdd() {
    stateDispatch({ type: "setIsBusy" });

    const body: registerCollaboratorModel = {
      name: state.username,
      email: state.email,
      phone: state.phoneNumber,
      designation: state.designation,
      permissions: state.permission,
      password: state.password,
    };

    AxiosAuth.post(RoutesAppApi.User.Root(), body)
      .then((r) => {
        if (r.status === 200) {
          mutate(RoutesAppApi.User.GetUser());
          BootstrapUtils.ModalHideById("admin_password_validation_modal");
          toast.success("Collaborator added successfully");
        }
        stateDispatch({ type: "setIsNotBusy" });
        BootstrapUtils.ModalHideById("admin_password_validation_modal");
      })
      .catch(() => {
        stateDispatch({ type: "setIsNotBusy" });
        toast.error("Permission Denied");
      });
  }

  const isFormInputValid =
    !!state.username && !!state.email && !!state.permission;
  const [searchText, setSearchText] = React.useState("");

  const users = React.useMemo(() => {
    const data = Array.isArray(apiUserData) ? apiUserData : [];

    if (searchText) {
      const text = searchText.toLowerCase();
      return data.filter((t) => t.name.toLowerCase().includes(text));
    } else {
      return data;
    }
  }, [apiUserData, searchText]);

  function onUserDelete(selectedId: string) {
    stateDispatch({ type: "setIsBusy" });

    const body = {
      id: selectedId,
      isActive: false
    }

    AxiosAuth.delete(`${RoutesAppApi.Auth.DeleteAccount()}/${body.id}`).then((r) => {
      if (r.status === 200) {
        mutate(RoutesAppApi.User.GetUser());
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteUser);
        toast.success("User deleted successfully");
      }
      stateDispatch({ type: "setIsNotBusy" });
      BootstrapUtils.ModalHideById(DomID.Modals.DeleteUser);
    }).catch(r => {
      stateDispatch({ type: "setIsNotBusy" });
      toast.error("User deletion failed");
    });
  }

  return {
    searchText,
    setSearchText,
    users,
    state,
    onUserAdd,
    setUsername,
    setEmail,
    setPhoneNumber,
    setDesignation,
    setPermission,
    setPassword,
    isFormInputValid,
    onUserDelete,
  };
}
