import axiosInstance from './axiosInstance';

export const getDataAPI = async (url, token) => {
  const res = await axiosInstance.get(`api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, data, token) => {
  const res = await axiosInstance.post(`/api/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, data, token) => {
  const res = await axiosInstance.put(`/api/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, data, token) => {
  const res = await axiosInstance.patch(`/api/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axiosInstance.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
