import axios from "axios";
axios.defaults.baseURL = "http://3.88.194.152/";

export const apiRequest = async (url, method, body, header) => {
  var config = {
    method,
    url,
    headers: {
      ...header
    },
    data: body,
  };

  const response = await axios(config);
  return response.data;
};
