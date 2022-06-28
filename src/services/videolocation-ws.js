import { api } from "./api";
import { serverFailRes, serverSuccessRes } from "../utils/clearRes";

export const videolocationCreateWs = (credentials) =>
  api
    .post("/videolocations/create", credentials)
    .then(serverSuccessRes)
    .catch(serverFailRes);

export const uploadWs = (file) =>
  api
    .post("/videolocations/upload", file)
    .then(serverSuccessRes)
    .catch(serverFailRes);

export const videolocationsCallWs = () =>
  api.post("/videolocations").then(serverSuccessRes).catch(serverFailRes);

export const currentUserVideolocationsWs = (credentials) =>
  api
    .post("/videolocations/current-user-locations", credentials)
    .then(serverSuccessRes)
    .catch(serverFailRes);

export const videolocationDetailsWs = (credentials) =>
  api
    .post("/videolocations/details", credentials)
    .then(serverSuccessRes)
    .catch(serverFailRes);

export const videolocationUpdateWs = (credentials) =>
  api
    .post("/videolocations/update", credentials)
    .then(serverSuccessRes)
    .catch(serverFailRes);

export const videolocationDeleteWs = (credentials) =>
  api
    .post("/videolocations/delete", credentials)
    .then(serverSuccessRes)
    .catch(serverFailRes);

export const addOneViewWs = (credentials) =>
  api
    .post("/videolocations/updateViews", credentials)
    .then(serverSuccessRes)
    .catch(serverFailRes);

export const removeVideoFromCloudinary = (credentials) =>
  api
    .post("/videolocations/deleteVideo-cloudinaryServices", credentials)
    .then(serverSuccessRes)
    .catch(serverFailRes);
