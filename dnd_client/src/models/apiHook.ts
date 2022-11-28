import { responseInterface } from "swr";

export type TypeApiHook<R = any, E = any> = {
  useHook() : responseInterface<R, E>;
  Reload(): void;
}

export type TypeApiResponseMapper<D, A> = (data?: D) => A;