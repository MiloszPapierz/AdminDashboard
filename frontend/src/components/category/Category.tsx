import React, { memo, useCallback } from "react";

interface props {
  categoryID: number;
  categoryName: string;
  onDelete: (id: number) => void;
}

const Category = memo(
  ({ categoryID, categoryName, onDelete }: props): JSX.Element => {
    const handleDelete = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onDelete(categoryID);
      },
      [categoryID, onDelete]
    );

    return (
      <div
        className="py-2 border-b-2 last-of-type:border-none flex flex-row justify-between"
        data-cy="category"
      >
        {categoryName}
        <button onClick={handleDelete} data-cy="removeCategory_btn">
          x
        </button>
      </div>
    );
  }
);

export default Category;
