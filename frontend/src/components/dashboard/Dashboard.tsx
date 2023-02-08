import { useEffect, useState, useCallback } from "react";
import {
  ICategory,
  ICategoryFormInput,
  IOrder,
  IProduct,
} from "../../types/types";
import Error from "../Error";
import Loader from "../Loader";
import useOrders from "../../api/orders";
import useProducts from "../../api/products";
import useCategories from "../../api/categories";
import { RiNumbersFill } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { GiProfit } from "react-icons/gi";
import Card from "./Card";
import Chart from "./Chart";
import { SubmitHandler } from "react-hook-form";
import CategoriesList from "./CategoriesList";

const findPendingOrders = (orders: IOrder[]): number => {
  return orders.filter((o) => o.orderStatus === "Pending").length;
};

const findTotalSale = (orders: IOrder[], today: boolean): number => {
  return orders
    .filter((o) =>
      today
        ? new Date(o.orderDate).toDateString() === new Date().toDateString()
        : true
    )
    .map((o) => o.products)
    .reduce((prev, current) => {
      return (prev =
        prev +
        current.reduce((p, c) => {
          return (p = p + c.quantity * c.unitPrice);
        }, 0));
    }, 0);
};

const Dashboard = (): JSX.Element => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const productsApi = useProducts();
  const ordersApi = useOrders();
  const categoriesApi = useCategories();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [orders, products, categories] = await Promise.all([
          ordersApi.getAll(),
          productsApi.getAll(),
          categoriesApi.getAll(),
        ]);
        setOrders(orders);
        setProducts(products);
        setCategories(categories);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productsApi, ordersApi, categoriesApi]);

  const onSubmit: SubmitHandler<ICategoryFormInput> = useCallback(
    async (data: ICategoryFormInput) => {
      try {
        setError(null);
        setLoading(true);
        const category = await categoriesApi.create({
          categoryName: data.category,
        });
        setCategories([...categories, category]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [categories, categoriesApi]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        setError(null);
        setLoading(true);
        await categoriesApi.deleteCategory(id);
        setCategories(categories.filter((c) => c.categoryID !== id));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [categories, categoriesApi]
  );

  return (
    <>
      <Error error={error} />
      <Loader loading={loading} />
      {!loading && !error ? (
        <>
          <div className="grid grid-flow-row text-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              Icon={RiNumbersFill}
              headerText={"Products"}
              bodyText={products.length}
            />
            <Card
              Icon={MdOutlinePendingActions}
              headerText={"Pending Orders"}
              bodyText={findPendingOrders(orders)}
            />
            <Card
              Icon={TbReportMoney}
              headerText={"Total Sales"}
              bodyText={`${findTotalSale(orders, false).toFixed(2)} EUR`}
            />
            <Card
              Icon={GiProfit}
              headerText={"Sales Today"}
              bodyText={`${findTotalSale(orders, true).toFixed(2)} EUR`}
            />
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-10 mb-4 pr-1 md:pr-4">
            <div className="font-mono bg-light-grey border rounded-md pt-4 pl-4 col-span-6">
              <Chart orders={orders} />
            </div>
            <div className="col-span-4 font-mono border rounded-md bg-light-grey w-full mt-4 md:mt-0 md:ml-4">
              <CategoriesList
                categories={categories}
                onSubmit={onSubmit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Dashboard;
