import Axios from "axios";
import { AxiosAuthInjector, AxiosRedirectUnauthorize } from "./axiosInterceptors";

const AxiosAuth = Axios.create();

AxiosAuthInjector.Add(AxiosAuth);
AxiosRedirectUnauthorize.Add(AxiosAuth, '/home', () => window.localStorage.clear());

export { AxiosAuth };
