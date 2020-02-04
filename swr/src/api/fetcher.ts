function fetcher(input: RequestInfo, init: RequestInit) {
  return fetch(input, init).then((response: Response) => response.json());
}

export function save(data: any, input: RequestInfo, init?: RequestInit) {
  return fetch(input, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    ...init
  }).then((response: Response) => response.json());
}

export function deleteItem(input: RequestInfo, init?: RequestInit) {
  return fetch(input, {
    method: "DELETE",
    ...init
  }).then((response: Response) => response.json());
}

export default fetcher;
