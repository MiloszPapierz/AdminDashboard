import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IOrder, IOrderFormInput, OrderStatusEnum } from "../../types/types";

interface props {
  onShow: () => void;
  onUpdate: (id: number, order: IOrder) => void;
  currentOrder: IOrder;
}

const statuses = Object.keys(OrderStatusEnum).filter((s) => isNaN(Number(s)));

const OrderModal = ({ onShow, currentOrder, onUpdate }: props): JSX.Element => {
  const methods = useForm<IOrderFormInput>();

  const handleShowModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onShow();
    },
    [onShow]
  );

  const onSubmit: SubmitHandler<IOrderFormInput> = useCallback(
    (data: IOrderFormInput) => {
      onUpdate(currentOrder.orderID, {
        ...currentOrder,
        orderStatus: data.status,
      });
    },
    [currentOrder, onUpdate]
  );

  return (
    <>
      <div className="justify-center flex overflow-x-hidden overflow-y-auto p-1 fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full lg:w-3/4 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3
                className="text-3xl text-dark-green font-semibold"
                data-cy="orderModal_title"
              >
                Update Order
              </h3>
            </div>
            <div className="relative p-6 flex-auto">
              <form id="my-form" onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col text-sonic-silver pt-2 pb-2">
                  <label htmlFor="status" className="pb-2 font-bold">
                    Status
                  </label>
                  <select
                    id="status"
                    {...methods.register("status", {
                      required: "Status is required",
                    })}
                    data-cy="orderStatus_input"
                  >
                    {statuses.map((v) => (
                      <option
                        key={v}
                        value={v}
                        selected={
                          currentOrder.orderStatus.toLocaleLowerCase() ===
                          v.toLocaleLowerCase()
                        }
                      >
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleShowModal}
                data-cy="closeOrderModal_btn"
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                form="my-form"
                data-cy="updateOrder_btn"
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default OrderModal;
