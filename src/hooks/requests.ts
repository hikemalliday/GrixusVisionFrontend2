import { useAxios } from "./useAxios";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface IUseLoginParams {
  username: string;
  password: string;
}

export interface IUseItemsParams {
  itemName: string;
  charName: string;
  page: number;
  pageSize: number;
}

const API_URL = "http://127.0.0.1:8000/api/";

export const useLogin = () => {
  const axiosInstance = useAxios(API_URL, false);
  const loginMutation = useMutation({
    mutationFn: async (creds: IUseLoginParams) =>
      await axiosInstance.post("token/", creds, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: (data) => data,
    onError: (err) => err,
  });
  return loginMutation;
};

export const useSignUp = () => {
  const axiosInstance = useAxios(API_URL, false);
  const loginMutation = useMutation({
    mutationFn: async (creds: IUseLoginParams) => {
      try {
        const response = await axiosInstance.post("register/", creds, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log("Mutation response:", response);
        return response.data;
      } catch (error) {
        console.error("Mutation error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // console.log("Mutation onSuccess:", data);
      return data;
    },
    onError: (err) => {
      console.error("Mutation onError:", err);
    },
  });
  return loginMutation;
};

export const useItems = (params: IUseItemsParams) => {
  const axiosInstance = useAxios(API_URL);
  if (params["charName"] == "ALL") params["charName"] = "";
  return useQuery({
    queryKey: [
      params["itemName"],
      params["charName"],
      params["page"],
      params["pageSize"],
    ],
    queryFn: async () => {
      const response = await axiosInstance.get("charinventory/", {
        params: params,
      });
      return response.data;
    },
  });
};

export const useCharNames = () => {
  const axiosInstance = useAxios(API_URL);
  return useQuery({
    queryKey: ["charNames"],
    queryFn: async () => {
      const response = await axiosInstance.get("get_char_names/");
      return response.data;
    },
  });
};
