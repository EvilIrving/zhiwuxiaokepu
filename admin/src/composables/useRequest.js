import _ from "lodash";

const API_CONFIG = {
  baseURL: import.meta.env.API_URL,
};

const USE_AXIOS_OPTIONS = {
  immediate: false,
};

function request(url, options = {}, useAxiosOptions) {
  options = _.omitBy(Object.assign({}, API_CONFIG, options), _.isNil);
  const { data, error, isLoading, isCanceled, abort, execute } = useAxios(
    url,
    options,
    useAxiosOptions
  );

  return {
    data: readonly(data),
    error: readonly(error),
    isPending: readonly(isLoading),
    isCancelled: readonly(isCanceled),
    execute,
    abort,
  };
}

export default function useRequest(
  url,
  options = {},
  useAxiosOptions = USE_AXIOS_OPTIONS
) {
  return request(url, options, useAxiosOptions);
}
