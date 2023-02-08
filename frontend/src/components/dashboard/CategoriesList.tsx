import { useForm } from "react-hook-form";
import { ICategory, ICategoryFormInput } from "../../types/types";
import Category from "../category/Category";

interface props {
  categories: ICategory[];
  onSubmit: (data: ICategoryFormInput) => void;
  onDelete: (id: number) => void;
}

const CategoriesList = ({
  categories,
  onSubmit,
  onDelete,
}: props): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoryFormInput>();
  const hasError = "category" in errors;

  return (
    <>
      <h1 className="font-bold text-base pt-4 pl-4" data-cy="categories_title">
        Categories
      </h1>
      <div className="pt-4 pl-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between pr-4">
            <input
              {...register("category", {
                minLength: {
                  message: "Category should have atleast 3 chars",
                  value: 3,
                },
                required: {
                  message: "Category can not be empty",
                  value: true,
                },
              })}
              placeholder="Enter category"
              type="text"
              className="border rounded w-3/4 outline-none"
              id="category"
              name="category"
              data-cy="category_input"
            />
            <button
              className="bg-sky-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              data-cy="addCategory_btn"
            >
              Add
            </button>
          </div>
        </form>
        {hasError ? (
          <p className="text-red-600 pt-2" data-cy="category_error">
            {errors["category"]?.message}
          </p>
        ) : null}
        <div className="flex flex-col pt-2 pr-4">
          {categories.map((category) => (
            <Category
              key={category.categoryID}
              categoryID={category.categoryID}
              categoryName={category.categoryName}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesList;
