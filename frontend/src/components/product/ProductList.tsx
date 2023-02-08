import { useState, useEffect, useCallback } from "react";
import useProducts from "../../api/products";
import { IProduct } from "../../types/types";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import Error from "../Error";
import Loader from "../Loader";

const ProductList = (): JSX.Element => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<IProduct>(
    {} as IProduct
  );
  const productsApi = useProducts();

  const handleShowModal = (): void => {
    setShowModal(!showModal);
    setCurrentProduct({} as IProduct);
  };

  const refreshProducts = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [productsApi]);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const handleDelete = useCallback(
    async (id: Number) => {
      try {
        setLoading(true);
        setError(null);
        await productsApi.deleteProduct(id);
        setProducts((products) =>
          products.filter((product) => product.productID !== id)
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [productsApi]
  );

  const handleCreate = useCallback(
    async (product: FormData) => {
      try {
        setError(null);
        setLoading(true);
        await productsApi.createProduct(product);
        await refreshProducts();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [refreshProducts, productsApi]
  );

  const setProductToUpdate = useCallback(
    (id: number | null) => {
      setCurrentProduct(
        id === null
          ? ({} as IProduct)
          : (products.find((p) => p.productID === id) as IProduct)
      );
      setShowModal(true);
    },
    [products]
  );

  const handleUpdate = useCallback(
    async (id: number, product: FormData) => {
      try {
        setError(null);
        setLoading(true);
        await productsApi.updateProduct(id, product);
        await refreshProducts();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [refreshProducts, productsApi]
  );

  return (
    <>
      <div className="mx-auto p-1 md:p-6 font-mono bg-light-grey border rounded-md">
        <div className="flex flex-col xsm:flex-row justify-between pb-4">
          <h1 className="text-base font-bold pb-4">Products</h1>
          <button
            onClick={handleShowModal}
            className="bg-sky-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            data-cy="addProduct_btn"
          >
            Add product
          </button>
        </div>
        {showModal ? (
          <ProductModal
            onShow={handleShowModal}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            currentProduct={currentProduct}
          />
        ) : null}
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <Error error={error} />
          <Loader loading={loading} />
          {!loading && !error ? (
            <div className="w-full overflow-x-auto border">
              <ProductTable
                products={products}
                onDelete={handleDelete}
                onUpdate={setProductToUpdate}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductList;
