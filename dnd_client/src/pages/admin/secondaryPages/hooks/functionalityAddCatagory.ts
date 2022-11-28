import { toast } from "react-toastify";
import React from "react";
import { useHistory } from "react-router-dom";
import { DomID, RoutesAppApi, RoutesAppUi } from "../../../../config";
import { ApiHooks, AxiosAuth } from "../../../../core";
import { BootstrapUtils } from "../../../../utils";
import { mutate } from "swr";

export function useFunctionalityAddCatagory() {
  const reloadTemplateCatagoryApi =
    ApiHooks.Admin.Templates.GetTemplateCatagoy.Reload;
  const groupId = RoutesAppUi.Admin.Category.ByGroup.useParam();
  const routeHistory = useHistory();
  const [isBusy, setIsBusy] = React.useState<boolean>(false);
  const [isUpdateBusy, setIsUpdateBusy] = React.useState<boolean>(false);
  const [catagoryName, setCatagoryName] = React.useState<string>("");
  const [iconImage, setIconImage] = React.useState([] as any);
  const [coverPhoto, setCoverPhoto] = React.useState([] as any);

  React.useEffect(() => {
    const resetGroupSelection = () => {
      setCatagoryName("");
    };
    $(BootstrapUtils.GetSelectorById(DomID.Modals.AddCatagory)).on(
      "hidden.bs.modal",
      resetGroupSelection
    );
    return () => {
      $(BootstrapUtils.GetSelectorById(DomID.Modals.AddCatagory)).off(
        "hidden.bs.modal",
        resetGroupSelection
      );
    };
  });

  if (groupId === undefined) {
    routeHistory.push(RoutesAppUi.PageNotFount.Root);
  }

  const isFormInputValid = !!catagoryName;
  const formData = new FormData();
  formData.append("CategoryName", catagoryName);
  formData.append("GroupId", groupId as string);
  formData.append("Icon", iconImage as Blob);
  formData.append("CoverPhoto", coverPhoto as Blob);

  function onCreateCatagory(): void {
    setIsBusy(true);
    if (!isFormInputValid) return;
    AxiosAuth.post(RoutesAppApi.Category.Root(), formData)
      .then((r) => {
        if (r.status === 200) {
          reloadTemplateCatagoryApi();
          BootstrapUtils.ModalHideById(DomID.Modals.AddCatagory);
          setIsBusy(false);
        }
      })
      .catch((r) => {
        toast.error("Action failed");
        setIsBusy(false);
      });
  }

  function onUpdateCategory(category: any): void {
    setIsUpdateBusy(true);
    if(category.id && catagoryName) {
      const formData = new FormData();
      formData.append("id", category.id);
      formData.append("CategoryName", catagoryName);
      formData.append("GroupId", groupId as string);
      formData.append("Icon", iconImage as Blob);
      formData.append("CoverPhoto", coverPhoto as Blob);

      AxiosAuth.put(RoutesAppApi.Category.Root(), formData)
      .then((r) => {
        if (r.status === 200) {
          reloadTemplateCatagoryApi();
          
          setIsUpdateBusy(false);
          BootstrapUtils.ModalHideById(DomID.Modals.AddCatagory);
        }
      })
      .catch((r) => {
        toast.error("Action failed");
        setIsUpdateBusy(false);
      });
    } else {
      toast.error("invalid form");
    }
    
  }

  function onDeleteCategory(id: string) {
    setIsBusy(true);
    AxiosAuth.delete(RoutesAppApi.Category.Delete(id))
      .then((r) => {
        if (r.status === 200) {
          mutate(RoutesAppApi.Category.GetAllCategory());
          toast.success("Category deleted successfully");
          BootstrapUtils.ModalHideById(DomID.Modals.AddCatagory);
          setIsBusy(false);
        }
      })
      .catch(() => {
        toast.error("Action failed.");
        setIsBusy(false);
      });
  }

  return {
    isBusy,
    isUpdateBusy,
    iconImage,
    setIconImage,
    coverPhoto,
    setCoverPhoto,
    isFormInputValid,
    catagoryName,
    setCatagoryName,
    onCreateCatagory,
    onUpdateCategory,
    onDeleteCategory,
  };
}
