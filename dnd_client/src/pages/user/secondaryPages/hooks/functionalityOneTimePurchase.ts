import { toast } from "react-toastify";
import { DomID } from "./../../../../config/constants";
import { BootstrapUtils } from "./../../../../utils/bootstrap";
import React from "react";
import { RoutesAppApi } from "../../../../config";
import { AxiosAuth } from "../../../../core";
import { loadStripe } from "@stripe/stripe-js";

export function useFunctionalityOneTimePurchase() {
  //   const [state, stateDispatch] = React.useReducer<TypeComponentReducer>(
  //     ComponentReducer,
  //     {
  //       billType: "Monthly",
  //       amount: "",
  //       isBusy: false,
  //       usertype: "",
  //       sessionid: ""
  //     }
  //   );

  //   React.useEffect(() => {
  //     const resetGroupSelection = () => {
  //       stateDispatch({ type: "reset" });
  //     };
  //     $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).on(
  //       "hidden.bs.modal",
  //       resetGroupSelection
  //     );
  //     return () => {
  //       $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).off(
  //         "hidden.bs.modal",
  //         resetGroupSelection
  //       );
  //     };
  //   });

  //   const setBillType = React.useCallback(
  //     (text?: string) => stateDispatch({ type: "setBillType", payload: text }),
  //     []
  //   );

  //   const setAmount = React.useCallback(
  //     (text?: string) => stateDispatch({ type: "setAmount", payload: text }),
  //     []
  //   );
  //   const setUerType = React.useCallback(
  //     (text: string) => stateDispatch({ type: "setUerType", payload: text }),
  //     []
  //   );
  //   const setSID = React.useCallback(
  //     (text: string) => stateDispatch({ type: "setSID", payload: text }),
  //     []
  //   );

  function onPayment(user: string): void {
    // if (user === "Pro") {
    //   const body: PurchasePrice = {
    //     package: 1,
    //     currencyId: 1
    //   };
    //   AxiosAuth.post(RoutesAppApi.Pricing.Purchase(), body)
    //     .then(
    //       r => {
    //         if (r.status === 200) {
    //           BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
    //           toast.success("");

    //           // imgUrl = r.data.fileUrl;
    //           // imgUrlProxy = r.data.fileUrlProxy;
    //           setSID(r.data);
    //           BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
    //         }
    //         stateDispatch({ type: "setIsNotBusy" });
    //         BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
    //       },
    //       () => {
    //         toast.error("");
    //       }
    //     )
    //     .catch(() => stateDispatch({ type: "setIsNotBusy" }));
    //   BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
    // } else if (user === "Enterprize") {
    //   const body: PurchasePrice = {
    //     package: 2,
    //     currencyId: 1
    //   };
    //   AxiosAuth.post(RoutesAppApi.Pricing.Purchase(), body)
    //     .then(
    //       r => {
    //         if (r.status === 200) {
    //           BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
    //           toast.success("");

    //           var sID = r.data;
    //           setSID(r.data);
    //           console.log("sid : ", sID);
    //           // imgUrlProxy = r.data.fileUrlProxy;
    //           BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
    //         }
    //         stateDispatch({ type: "setIsNotBusy" });
    //         BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
    //       },
    //       () => {
    //         toast.error("");
    //       }
    //     )
    //     .catch(() => stateDispatch({ type: "setIsNotBusy" }));
    //   BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
    // }

    console.log("user type : ", user);
  }

  //   return {
  //     state,
  //     setBillType,
  //     setAmount,
  //     stateDispatch,
  //     onPayment,
  //     setUerType
  //   };
}
