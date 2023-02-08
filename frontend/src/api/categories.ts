import { useCallback, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ICategory, ICategoryCreate, ICategoryResponse } from "../types/types";

const baseURL = `${process.env.REACT_APP_API_URL}/categories`;

const useCategories = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const response = await axios.get<ICategoryResponse>(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.items;
  }, [getAccessTokenSilently]);

  const create = useCallback(
    async (category: ICategoryCreate) => {
      const token = await getAccessTokenSilently();
      const { data } = await axios.post<ICategory>(baseURL, category, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    [getAccessTokenSilently]
  );

  const deleteCategory = useCallback(
    async (id: number) => {
      const token = await getAccessTokenSilently();
      await axios.delete<null>(`${baseURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [getAccessTokenSilently]
  );

  const categoriesApi = useMemo(
    () => ({ getAll, create, deleteCategory }),
    [getAll, create, deleteCategory]
  );

  return categoriesApi;
};

export default useCategories;
