import { useCallback, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { IOrderUpdate, IOrder, IOrderResponse } from "../types/types";

const BASE_URL = `${process.env.REACT_APP_API_URL}/orders`;

const useOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get<IOrderResponse>(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.items;
  }, [getAccessTokenSilently]);

  const deleteById = useCallback(
    async (id: number) => {
      const token = await getAccessTokenSilently();
      await axios.delete<null>(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [getAccessTokenSilently]
  );

  const updateById = useCallback(
    async (id: number, order: IOrderUpdate) => {
      const token = await getAccessTokenSilently();
      await axios.put<IOrder>(`${BASE_URL}/${id}`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [getAccessTokenSilently]
  );

  const ordersApi = useMemo(
    () => ({
      getAll,
      deleteById,
      updateById,
    }),
    [deleteById, getAll, updateById]
  );

  return ordersApi;
};

export default useOrders;
