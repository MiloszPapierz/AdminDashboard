import { useCallback, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { IProduct, IProductResponse } from "../types/types";

const baseUrl: string = `${process.env.REACT_APP_API_URL}/products`;

const useProducts = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const response = await axios.get<IProductResponse>(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.items;
  }, [getAccessTokenSilently]);

  const deleteProduct = useCallback(
    async (id: Number) => {
      const token = await getAccessTokenSilently();
      await axios.delete<null>(`${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [getAccessTokenSilently]
  );

  const createProduct = useCallback(
    async (product: FormData) => {
      const token = await getAccessTokenSilently();
      await axios.post<IProduct>(baseUrl, product, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [getAccessTokenSilently]
  );

  const updateProduct = useCallback(
    async (id: Number, product: any) => {
      const token = await getAccessTokenSilently();
      await axios.put<IProduct>(`${baseUrl}/${id}`, product, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [getAccessTokenSilently]
  );

  const productsApi = useMemo(
    () => ({
      getAll,
      createProduct,
      updateProduct,
      deleteProduct,
    }),
    [getAll, createProduct, updateProduct, deleteProduct]
  );

  return productsApi;
};

export default useProducts;
