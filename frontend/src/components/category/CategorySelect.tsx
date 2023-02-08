import { useState, useEffect } from "react";
import { ICategory } from "../../types/types";
import useCategories from "../../api/categories";
import { useFormContext } from "react-hook-form";

interface Props {
  selectedCategory: number;
}

const CategorySelect = ({ selectedCategory }: Props): JSX.Element => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const categoriesApi = useCategories();

  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const categories = await categoriesApi.getAll();
        setCategories(categories);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, [categoriesApi]);

  return (
    <>
      <div className="flex flex-col text-sonic-silver pt-2 pb-2">
        <label htmlFor="categoryName" className="pb-2 font-bold">
          Category
        </label>
        <select
          {...register("categoryID", { required: "Category is required" })}
          id="categoryID"
          name="categoryID"
          className="border rounded p-1 outline-none"
          disabled={loading || error || isSubmitting}
          data-cy="category_input"
        >
          <option value="">
            {loading
              ? "Loading categories"
              : error
              ? "Error occured while fetching categories"
              : "-- Choose category --"}
          </option>
          {categories.map(({ categoryID, categoryName }) => (
            <option
              key={categoryID}
              value={categoryID}
              selected={categoryID === selectedCategory ? true : false}
            >
              {categoryName}
            </option>
          ))}
        </select>
        {"categoryID" in errors ? (
          <p className="text-red-600" data-cy="category_error">
            {errors["categoryID"]?.message?.toString()}
          </p>
        ) : null}
      </div>
    </>
  );
};

export default CategorySelect;
