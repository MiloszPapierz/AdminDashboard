import { memo, useMemo, useState, useCallback } from "react";
import { IOrder } from "../../types/types";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

interface Props {
  order: IOrder;
  onDelete: (id: number) => void;
  onUpdate: (id: number | null) => void;
}

const transformDate = (date: Date): string => {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

const Order = memo(
  ({
    order: { orderID, orderDate, orderLocation, orderStatus, products },
    onDelete,
    onUpdate,
  }: Props): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    const waarde = useMemo<number>(() => {
      return products.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.unitPrice * currentValue.quantity,
        0
      );
    }, [products]);

    const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
      e.preventDefault();
      setOpen(!open);
    };

    const handleDelete = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onDelete(orderID);
      },
      [onDelete, orderID]
    );

    const handleUpdate = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onUpdate(orderID);
      },
      [onUpdate, orderID]
    );

    return (
      <>
        <tr className="text-gray-700" data-cy="order">
          <td
            className="px-4 py-3 text-ms font-semibold border cursor-pointer"
            onClick={handleClick}
          >
            <div className="flex relative">
              <div
                className={`rotate-0 absolute duration-100 ${
                  open && "rotate-90"
                }`}
              >
                {">"}
              </div>
              <div className="pl-4" data-cy="orderID">
                {orderID}
              </div>
            </div>
          </td>
          <td
            className="px-4 py-3 text-ms font-semibold border"
            data-cy="orderDate"
          >
            {transformDate(orderDate)}
          </td>
          <td
            className="px-4 py-3 text-ms font-semibold border"
            data-cy="orderLocation"
          >
            {orderLocation}
          </td>
          <td
            className="px-4 py-3 text-ms font-semibold border"
            data-cy="amount"
          >
            {waarde.toFixed(2)} EUR
          </td>
          <td
            className="px-4 py-3 text-ms font-semibold border"
            data-cy="orderStatus"
          >
            {orderStatus}
          </td>
          <td className="px-4 py-3 text-ms font-semibold border">
            <div className="flex gap-x-2">
              <button
                className="bg-sky-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
                data-cy="orderDelete_btn"
              >
                <AiFillDelete />
              </button>
              <button
                className="bg-sky-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
                data-cy="orderUpdate_btn"
              >
                <AiFillEdit />
              </button>
            </div>
          </td>
        </tr>
        <tr className={!open ? `hidden` : ``}>
          <td colSpan={6}>
            <div>
              {products.map((product) => {
                return (
                  <div
                    className="flex justify-end pr-36 md:pr-64 gap-8"
                    key={product.productID}
                  >
                    <p>{product.productName}</p>
                    <p>{product.quantity}</p>
                  </div>
                );
              })}
            </div>
          </td>
        </tr>
      </>
    );
  }
);

export default Order;
