import axios from "axios";

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