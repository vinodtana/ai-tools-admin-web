import mixpanel from "mixpanel-browser";
import { MIXPANEL_ID } from "./../config";
mixpanel.init(MIXPANEL_ID);

export const getTotalAmount = (cartItems) => {
  var totalAmount = 0;
  cartItems.map((itemCard, indexItem) => {
    var itemPrice = itemCard?.quantity * itemCard?.priceList[0]?.price;
    totalAmount = totalAmount + itemPrice;
  });
  return totalAmount;
};
export const parseAddress = (place, addressStr) => {
  const selectedAddress = addressStr?.split(",") ?? [];
  console.log("place?.address_components", place?.address_components);
  return {
    address1: selectedAddress[0],
    address2: "",
    city:
      place?.address_components?.filter((a) =>
        a?.types?.includes("locality")
      )[0]?.long_name ||
      selectedAddress[1] ||
      "",
    state:
      place?.address_components?.filter((a) =>
        a?.types?.includes("administrative_area_level_1")
      )[0]?.long_name ||
      selectedAddress[2] ||
      "",
    country:
      place?.address_components?.filter((a) => a?.types?.includes("country"))[0]
        ?.long_name ||
      selectedAddress[3] ||
      "",
    zipcode:
      place?.address_components?.filter((a) =>
        a?.types?.includes("postal_code")
      )[0]?.long_name || "",
  };
};
export const checkRolePermission = (cId) => {
  // console.log("cId", cId);
  var returnF = false;
  var useObj = getUserInfo();
  if (useObj?.roles?.length > 0 && useObj?.roles[0]) {
    var useRole = useObj.roles[0]?.replace("ROLE_", "");
    // console.log("cId", cId);
    // console.log("useRole", useRole);
    if (useRole === "STORE_OWNER") {
      useRole = "Owner";
    } else if (useRole === "ADMIN") {
      useRole = "Admin";
    }
    const rolesPer = [
      
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer", "Freelancer"],
        itemId: "focusNextHome",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer", "Freelancer"],
        itemId: "focusNextAdministrator",
      },

      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer", "Freelancer"],
        itemId: "focusNextMaster",
      },
      
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer", "Freelancer"],
        itemId: "focusNextServiceManagement",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer", "Freelancer"],
        itemId: "jobcardsummary",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer", "Freelancer"],
        itemId: "createjobcard",
      },

      {
        rolesList: ["Owner", "Admin"],
        itemId: "ProductList",
      },
      {
        rolesList: ["Owner", "Admin"],
        itemId: "BrandList",
      },
      {
        rolesList: ["Owner", "Admin"],
        itemId: "ItemsReceivedList",
      },
      {
        rolesList: ["Owner", "Admin"],
        itemId: "DefaultIssuesOptionList",
      },
      {
        rolesList: ["Owner", "Admin"],
        itemId: "AdditionalRequirementList",
      },

      {
        rolesList: ["Owner", "Admin"],
        itemId: "ActiontakenList",
      },
      {
        rolesList: ["Owner", "Admin"],
        itemId: "EngineerObservationList",
      },
      {
        rolesList: ["Owner", "Admin"],
        itemId: "CustomerNoteList",
      },
      {
        rolesList: ["Owner", "Admin"],
        itemId: "PostalCodeList",
      },
      {
        rolesList: ["Owner", "Admin"],
        itemId: "AreaWardList",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer"],
        id: "focusNextLeadManagement",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer"],
        id: "focusNextBookingManagement",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer"],
        id: "focusNextAMCManagement",
      },
      {
        rolesList: ["Owner", "Admin"],
        id: "focusNextReports",
      },
      {
        rolesList: ["Owner", "Admin"],
        id: "focusNextConfiguration",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator"],
        id: "focusNextBilling",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator"],
        id: "focusNextQuotion",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer"],
        id: "focusNextjobCardsApproval",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer"],
        id: "focusNextjobCardsForwards",
      },
      {
        rolesList: ["Owner", "Admin"],
        id: "focusNextUsersList",
      },
      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer"],
        id: "focusNextCustomersList",
      },
      {
        rolesList: ["Owner", "Admin"],
        id: "PrintPageSetting",
      },

      {
        rolesList: ["Owner", "Admin", "Coordinator", "Engineer", "Freelancer"],
        id: "focusNextChangePassword",
      },
    ];
    rolesPer.map((itm) => {
      var tempId = itm?.itemId || itm?.id;
      if (cId === tempId && useRole && itm?.rolesList?.includes(useRole)) {
        returnF = true;
      }
    });
  }
  return returnF;
};
export const isRaskoAccount = (idN) => {
  const localObj = localStorage.getItem("user");
  const login_id1 =
    localObj != null && localObj != undefined && localObj != ""
      ? JSON.parse(localObj).id
      : undefined;
  if (login_id1) {
    const userInfo = JSON.parse(localObj);
    if (userInfo?.storeId === "SEP00014") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const isFocusNextAccount = (idN) => {
  const localObj = localStorage.getItem("user");
  const login_id1 =
    localObj != null && localObj != undefined && localObj != ""
      ? JSON.parse(localObj).id
      : undefined;
  if (login_id1) {
    const userInfo = JSON.parse(localObj);
    if (userInfo?.storeId === "SEP00001") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const checkAccessMenu = (idN) => {
  if (idN === "focusNextjobCardsApproval") {
    console.log("idNidN", idN);
  }

  const localObj = localStorage.getItem("user");
  const login_id1 =
    localObj != null && localObj != undefined && localObj != ""
      ? JSON.parse(localObj).id
      : undefined;
  if (login_id1) {
    const userInfo = JSON.parse(localObj);
    var useRole = userInfo.roles[0]?.replace("ROLE_", "");
    if (
      (idN === "focusNextjobCardsApproval" ||
        idN === "focusNextjobCardsForwards") &&
      useRole !== "STORE_OWNER"
    ) {
      return true;
    } else if (
      userInfo?.storeId === "SEP00001" ||
      userInfo?.storeId === "SEP00014"
    ) {
      return false;
    } else if (
      idN === "focusNextLeadManagement" ||
      idN === "focusNextAMCManagement" ||
      idN === "focusNextBookingManagement" ||
      idN === "focusNextConfiguration1" ||
      idN === "focusNextBilling" ||
      idN === "focusNextQuotion" ||
      idN === "focusNextMastersList" ||
      idN === "focusNextMaster" ||
      idN === "focusNextBilling"
      // idN === "focusNextjobCardsApproval"
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const getProductPrice = (product) => {
  console.log("product2", product);
  var totalAmount = "---";
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  if (userData) {
    console.log("userData", userData);
    product?.priceList.map((itemp) => {
      if (
        itemp?.city == userData?.data?.city &&
        itemp?.client == userData?.data?.companyName
      ) {
        totalAmount =
          itemp?.price + "(" + itemp?.discount + "%) / " + product?.priceType;
      }
    });
  }

  return totalAmount;
};
export const LOGINID =
  localStorage.getItem("user") != null
    ? JSON.parse(localStorage.getItem("user")).id
    : undefined;

export const triggerMixpanelEvent = (eventName, jsonData = {}) => {
  console.log("Mixpanel,eventName ", eventName, jsonData);
  const localObj = localStorage.getItem("user");
  const login_id1 =
    localObj != null && localObj != undefined && localObj != ""
      ? JSON.parse(localObj).id
      : undefined;
  var jsonObjData = {};
  if (login_id1) {
    const userInfo = JSON.parse(localObj);
    if (userInfo?.id) {
      console.log("userInfo", userInfo);
      jsonObjData.name = `${userInfo?.name}`;
      jsonObjData.user_id = userInfo?.id;
      jsonObjData.email = userInfo?.email;
      jsonObjData.storeId = userInfo?.storeId;
      jsonObjData.storeName = userInfo?.storeName;
      jsonObjData.username = userInfo?.username;
      jsonObjData.page_url = window?.location?.href;
      jsonObjData.event = eventName;
    }
  }

  const finalJson = { ...jsonData, ...jsonObjData };
  console.log("Mixpanel,finalJson ", eventName, finalJson);
  mixpanel.track(eventName, finalJson);
};
export const getUserInfo = () => {
  const localObj = localStorage.getItem("user");
  var returnO = {};
  const login_id1 =
    localObj != null && localObj != undefined && localObj != ""
      ? JSON.parse(localObj).id
      : undefined;
  if (login_id1) {
    const userInfo = JSON.parse(localObj);
    if (userInfo?.id) {
      returnO = userInfo;
    }
  }
  return returnO;
};

export const gotoLoginPage = () => {
  var tableColumns1 = localStorage.getItem("tableColumns");
  localStorage.clear();
  localStorage.setItem("tableColumns", tableColumns1);

  window.location.href = "/login";
};
export const triggerUserFprofileInMixpanel = (useD) => {
  try {
    if (useD && useD?.id) {
      mixpanel.identify(useD?.id);
      const nameD = `${useD?.name}`;
      mixpanel.people.set({
        name: nameD,
        user_id: useD?.id,
        username: useD?.username,
        $email: useD?.email,
      });
    } else {
      console.log("vvvvvvvv");
      mixpanel.identify();
      mixpanel.people.set({
        name: "Guest User",
      });
    }
  } catch (e) {
    console.log("e", e);
  }
};
export const checkIsMobile = () => {
  return window.innerWidth <= 700;
};
