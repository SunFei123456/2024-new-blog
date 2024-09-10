import request from "@/servers";

/**
 * Retrieves a poem from the server.
 *
 * @return {Promise} A promise containing the poem data
 */
export const getPoemList = (): Promise<any> => {
  return request({
    url: "/poem/list",
    method: "get",
  });
};
