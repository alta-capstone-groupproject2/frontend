import axios from "axios";
axios.defaults.baseURL = "https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/";

export const apiRequest = async (url, method, body, content_type) => {
  var config = {
    method,
    url,
    headers: {
      "Content-Type": content_type ? content_type : "application/json",
    },
    data: body,
  };

  const response = await axios(config);
  return response.data;
};