import { memo } from "react";
import { IOrder } from "../../types/types";
import Order from "./Order";

interface Props {
  orders: IOrder[];
  onDelete: (id: number) => void;
  onUpdate: (id: number | null) => void;
}

const OrderTable = memo(
  ({ orders, onDelete, onUpdate }: Props): JSX.Element => {
    return (
      <>
        <table className="w-full">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders.map((order) => {
              return (
                <Order
                  order={order}
                  key={order.orderID}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
);

export default OrderTable;
