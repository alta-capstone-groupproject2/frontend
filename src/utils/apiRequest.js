import axios from "axios";
axios.defaults.baseURL = "https://lamiapp.website/";

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
