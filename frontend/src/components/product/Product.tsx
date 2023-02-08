import React, { memo, useCallback } from "react";
import { IProduct } from "../../types/types";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

interface Props {
  product: IProduct;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

const Product = memo(
  ({
    product: {
      productID,
      imageUrl,
      productName,
      category,
      unitsInStock,
      unitPrice,
    },
    onDelete,
    onUpdate,
  }: Props): JSX.Element => {
    const handleDelete = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onDelete(productID);
      },
      [onDelete, productID]
    );

    const handleUpdate = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onUpdate(productID);
      },
      [productID, onUpdate]
    );

    return (
      <tr className="text-gray-700" data-cy="product">
        <td className="px-4 py-3 border" data-cy="product_image">
          <div className="w-12 h-12 mx-auto">
            <img
              className="object-cover w-full h-full"
              src={`${
                imageUrl ? imageUrl : window.location.origin + "/no-image.webp"
              }`}
              alt={productName}
              loading="lazy"
            />
          </div>
        </td>
        <td
          className="px-4 py-3 text-ms font-semibold border"
          data-cy="product_name"
        >
          {productName}
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {category.categoryName}
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {unitsInStock}
        </td>
        <td
          className="px-4 py-3 text-ms font-semibold border"
          data-cy="product_price"
        >
          {unitPrice} EUR
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">
          <div className="flex gap-x-2">
            <button
              onClick={handleDelete}
              className="bg-sky-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              data-cy="productDelete_btn"
            >
              <AiFillDelete />
            </button>
            <button
              className="bg-sky-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpdate}
              data-cy="productUpdate_btn"
            >
              <AiFillEdit />
            </button>
          </div>
        </td>
      </tr>
    );
  }
);

export default Product;
