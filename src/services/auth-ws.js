import { api } from "./api";
import { serverFailRes, serverSuccessRes } from "../utils/clearRes";

export const signupWs = (credentials) =>
  api
    .post("/auth/signup", credentials)
    .then(serverSuccessRes)
    .catch(serverFailRes);

export const loginWs = (credentials) =>
  api
    .post("/auth/login", credentials)
    .then(serverSuccessRes)
    .catch(serverFailRes);

export const logoutWs = () =>
  api.post("/auth/logout").then(serverSuccessRes).catch(serverFailRes);

export const accountRemoval = (credentials) =>
  api
    .post("/auth/accountremoval", credentials)
    .then(serverSuccessRes)
    .catch(serverFailRes);

export const authVerifyWs = () =>
  api.post("/auth/verifyauth").then(serverSuccessRes).catch(serverFailRes);
