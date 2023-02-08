import { useEffect, useState, useCallback } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { IProductFormInput, IProduct } from "../../types/types";
import CategorySelect from "../category/CategorySelect";
import LabelInput from "../LabelInput";

interface Props {
  onShow: () => void;
  onCreate: (product: FormData) => void;
  onUpdate: (id: number, product: FormData) => void;
  currentProduct: IProduct;
}

const ProductModal = ({
  onShow,
  onCreate,
  onUpdate,
  currentProduct,
}: Props): JSX.Element | null => {
  const methods = useForm<IProductFormInput>();
  const [image, setImage] = useState<File | undefined>();

  const handleShowModal = (): void => {
    onShow();
  };

  useEffect(() => {
    if (currentProduct && Object.keys(currentProduct).length !== 0) {
      const setValue = methods.setValue;
      setValue("productName", currentProduct.productName);
      setValue("unitPrice", currentProduct.unitPrice);
      setValue("unitsInStock", currentProduct.unitsInStock);
      setValue("categoryID", currentProduct.category.categoryID);
    }
  }, [currentProduct, methods.setValue]);

  const onSubmit: SubmitHandler<IProductFormInput> = useCallback(
    (data: IProductFormInput) => {
      const formData = new FormData();

      formData.append("productName", data.productName);
      formData.append("unitPrice", String(data.unitPrice));
      formData.append("unitsInStock", String(data.unitsInStock));
      formData.append("categoryID", String(data.categoryID));
      formData.append("image", data.image[0]);

      if (currentProduct && Object.keys(currentProduct).length !== 0) {
        onUpdate(currentProduct.productID, formData);
      } else {
        onCreate(formData);
      }

      methods.reset();
      onShow();
    },
    [currentProduct, methods, onCreate, onShow, onUpdate]
  );

  const handleImageChange = (image: File | undefined) => {
    setImage(image);
  };

  return (
    <>
      <div className="justify-center flex overflow-x-hidden overflow-y-auto p-1 fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full lg:w-3/4 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3
                className="text-3xl text-dark-green font-semibold"
                data-cy="modal_title"
              >
                {Object.keys(currentProduct).length
                  ? "Update Product"
                  : "Add product"}
              </h3>
            </div>
            <div className="relative p-6 flex-auto" data-cy="form">
              <FormProvider {...methods}>
                <form id="my-form" onSubmit={methods.handleSubmit(onSubmit)}>
                  <LabelInput
                    label="Product Name"
                    name="productName"
                    type="text"
                    data-cy="productName_input"
                  />
                  <LabelInput
                    label="Unit Price"
                    name="unitPrice"
                    type="number"
                    data-cy="unitPrice_input"
                    {...{ step: "0.01" }}
                  />
                  <LabelInput
                    label="Units In Stock"
                    name="unitsInStock"
                    type="number"
                    data-cy="unitsInStock_input"
                  />
                  <CategorySelect
                    selectedCategory={currentProduct?.category?.categoryID}
                  />
                  <LabelInput
                    label="Image"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    data-cy="image_input"
                  />
                </form>
              </FormProvider>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  className="mx-auto"
                  alt="Selected"
                />
              ) : Object.keys(currentProduct).length &&
                currentProduct.imageUrl ? (
                <img
                  src={currentProduct.imageUrl}
                  className="mx-auto"
                  alt={currentProduct.productName}
                />
              ) : (
                <p>No image selected</p>
              )}
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleShowModal}
                data-cy="closeProductModal_btn"
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                form="my-form"
                data-cy="productModalAction_btn"
              >
                {Object.keys(currentProduct).length
                  ? "Update Product"
                  : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ProductModal;
