export const BASE_URL = "http://192.168.1.91:8080";
export const DATE_FORMAT = "DD/MM/YYYY";
export const REST_API = {
    GET_INVOICE: "/invoice",
    DELETE_INVOICE: "/invoice/{id}",
    GET_ALL_CUSTOMER: "/customer",
    GET_CUSTOMER_BY_ID: "/customer/{id}",
    EDIT_CUSTOMER: "/customer/{id}",
    DELETE_CUSTOMER: "/customer/{id}",
    ADD_CUSTOMER: "/customer",
    GET_CUSTOMER_BY_NAME: "/customer/name",
    GET_ITEM_TYPES: "/invoice/itemTypes",
    DOWNLOAD_INVOICE: "/invoice/download/{id}",
    CREATE_INVOICE: "/invoice",
    LOGIN: "/login",
}