import { api } from "./api";
import { serverFailRes, serverSuccessRes } from "../utils/clearRes";

export const videolocationCreateWs = () =>
  api
    .post("/videolocations/create")
    .then(serverSuccessRes)
    .catch(serverFailRes);