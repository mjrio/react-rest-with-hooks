import { createClient, createCache } from "react-fetching-library";

import { requestHostInterceptor } from "./requestHostInterceptor";

// In real application this const will be stored in ENV's
const HOST = "http://localhost:3000/api";
const cache = createCache(
  action => action.method === "GET",
  _response => true
);

export const Client = createClient({
  cacheProvider: cache as any,
  requestInterceptors: [requestHostInterceptor(HOST)]
});
