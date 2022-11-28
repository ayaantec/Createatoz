import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { DomID, RoutesAppApi, RoutesAppUi } from "../../../../config";
import { ApiHooks, AxiosAuth } from "../../../../core";
import { BootstrapUtils } from "../../../../utils";

type InputFormData = {
  categoryName: string;
  height: string;
  width: string;
};

const InitInputFormData: InputFormData = {
  categoryName: "",
  height: "",
  width: "",
};

export function useFunctionalityAddSubCategory() {
  const reloadTemplateCatagoryApi =
    ApiHooks.Admin.Templates.GetTemplateCatagoy.Reload;
  const categoryId = RoutesAppUi.Admin.SubCategory.ByCategory.useParam();
  const routeHistory = useHistory();
  const [inputFormData, setInputFormData] = React.useState<InputFormData>(
    InitInputFormData
  );
  const [isBusy, setIsBusy] = React.useState<boolean>(false);
  const [subCoverPhoto, setSubCoverPhoto] = React.useState([] as any);

  React.useEffect(() => {
    const resetGroupSelection = () => {
      setInputFormData(InitInputFormData);
    };
    $(BootstrapUtils.GetSelectorById(DomID.Modals.AddSubCategory)).on(
      "hidden.bs.modal",
      resetGroupSelection
    );
    return () => {
      $(BootstrapUtils.GetSelectorById(DomID.Modals.AddSubCategory)).off(
        "hidden.bs.modal",
        resetGroupSelection
      );
    };
  });

  if (categoryId === undefined) {
    routeHistory.push(RoutesAppUi.PageNotFount.Root);
  }

  const isFormInputValid =
    !!inputFormData.categoryName &&
    !!inputFormData.height &&
    !!inputFormData.width;

  function updateFormData<T extends keyof InputFormData>(
    key: T,
    value: InputFormData[T]
  ): void {
    setInputFormData({ ...inputFormData, [key]: value });
  }

  const formData = new FormData();
  formData.append("SubCategoryName", inputFormData.categoryName);
  formData.append("Height", inputFormData.height);
  formData.append("Width", inputFormData.width);
  formData.append("CategoryId", categoryId as string);
  formData.append("ThumbNail", subCoverPhoto as Blob);

  function onCreateSubCatagory(): void {
    if (!isFormInputValid || isBusy) return;
    setIsBusy(true);
    AxiosAuth.post(RoutesAppApi.Category.SubCategory.Root(), formData)
      .then((r) => {
        if (r.status === 200) {
          reloadTemplateCatagoryApi();
          BootstrapUtils.ModalHideById(DomID.Modals.AddSubCategory);
          toast.success("Sub Category Added Successfully");
          setIsBusy(false);
        }
      })
      .catch(() => {
        toast.error("Failed To Add New Sub Category");
        setIsBusy(false);
      });
  }

  function onDeleteSubCategory(id: string) {
    setIsBusy(true);
    AxiosAuth.delete(RoutesAppApi.Category.SubCategory.Delete(id))
      .then((r) => {
        if (r.status === 200) {
          mutate(RoutesAppApi.Category.GetAllCategory());
          toast.success("Sucategory deleted successfully");
          BootstrapUtils.ModalHideById(DomID.Modals.AddSubCategory);
          setIsBusy(false);
        }
      })
      .catch(() => {
        toast.error("Action Failed");
        setIsBusy(false);
      });
  }

  return {
    isBusy,
    inputFormData,
    isFormInputValid,
    updateFormData,
    onCreateSubCatagory,
    subCoverPhoto,
    setSubCoverPhoto,
    onDeleteSubCategory,
  };
}
