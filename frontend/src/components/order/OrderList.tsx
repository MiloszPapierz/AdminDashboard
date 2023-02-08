import { useState, useEffect, useCallback } from "react";
import { IOrder, IOrderUpdate } from "../../types/types";
import useOrders from "../../api/orders";
import OrderTable from "./OrderTable";
import Error from "../Error";
import Loader from "../Loader";
import OrderModal from "./OrderModal";

const OrderList = (): JSX.Element => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentOrder, setCurrentOrder] = useState<IOrder>({} as IOrder);
  const [showModal, setShowModal] = useState<boolean>(false);
  const ordersApi = useOrders();

  const refreshOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ordersApi.getAll();
      data.forEach((d) => (d.orderDate = new Date(d.orderDate)));
      setOrders(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [ordersApi]);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const handleShowModal = useCallback(() => {
    setShowModal(!showModal);
    setCurrentOrder({} as IOrder);
  }, [showModal]);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        setError(null);
        await ordersApi.deleteById(id);
        setOrders(orders.filter((order) => order.orderID !== id));
      } catch (erorr) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [error, orders, ordersApi]
  );

  const setOrderToUpdate = useCallback(
    (id: number | null) => {
      setCurrentOrder(
        id === null
          ? ({} as IOrder)
          : (orders.find((order) => order.orderID === id) as IOrder)
      );
      setShowModal(true);
    },
    [orders]
  );

  const handleUpdate = useCallback(
    async (id: number, order: IOrder) => {
      try {
        setLoading(true);
        setError(null);
        const orderToUpdate: IOrderUpdate = {
          orderDate: order.orderDate,
          orderLocation: order.orderLocation,
          orderStatus: order.orderStatus,
        };
        await ordersApi.updateById(id, orderToUpdate);
        await refreshOrders();
        setShowModal(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [refreshOrders, ordersApi]
  );

  return (
    <>
      <div className="mx-auto p-1 md:p-6 font-mono bg-light-grey border rounded-md">
        <div className="flex flex-col xsm:flex-row justify-between pb-4">
          <h1 className="text-base font-bold pb-4">Orders</h1>
        </div>
        {showModal && currentOrder ? (
          <OrderModal
            onShow={handleShowModal}
            currentOrder={currentOrder}
            onUpdate={handleUpdate}
          />
        ) : null}
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <Error error={error} />
          <Loader loading={loading} />
          {!loading && !error ? (
            <div className="w-full overflow-x-auto border">
              <OrderTable
                orders={orders}
                onDelete={handleDelete}
                onUpdate={setOrderToUpdate}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default OrderList;
