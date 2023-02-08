import { memo } from "react";
import { IProduct } from "../../types/types";
import Product from "./Product";

interface Props {
  products: IProduct[];
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

const ProductTable = memo(
  ({ products, onDelete, onUpdate }: Props): JSX.Element => {
    return (
      <>
        <table className="w-full">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Units In Stock</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((product) => (
              <Product
                product={product}
                key={product.productID}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
);

export default ProductTable;
