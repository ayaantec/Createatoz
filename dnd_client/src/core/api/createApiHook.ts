import useSWR, { mutate } from "swr";
import { TypeApiHook, TypeApiResponseMapper } from "../../models";
import { AxiosInstance } from "axios";

export function CreateApiHook<R, M = any, E = any>(instance: AxiosInstance, url: string, mapper?: TypeApiResponseMapper<M, R>): TypeApiHook<R, E> {
  return {
    useHook() {
      const ret = useSWR(
        url,
        () => instance.get(url).then(r => r.data).then(data => !!data && !!mapper ? mapper(data) : data),
      );
      return ret;
    },
    Reload(): void {
      mutate(url);
    },
  };
}