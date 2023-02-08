import React from "react";
import { useFormContext } from "react-hook-form";
import { IValidationRules } from "../types/types";

interface Props {
  label: string;
  name: string;
  type: string;
  onChange?: (image: File | undefined) => void;
}

const validationRules: IValidationRules = {
  productName: {
    required: "Productname is required",
  },
  unitPrice: {
    required: "Unitprice is required",
    validate: (price) => price > 0 || "Unitprice has to be positive",
  },
  unitsInStock: {
    validate: (units) => units >= 0 || "Units in stock can not be negative",
    value: 0,
  },
};

const LabelInput = ({
  label,
  name,
  type,
  onChange,
  ...rest
}: Props): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const hasError = name in errors;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.files?.[0]);
  };
  return (
    <>
      <div className="flex flex-col text-sonic-silver pt-2 pb-2">
        <label htmlFor={name} className="pb-2 font-bold">
          {label}
        </label>
        <input
          {...register(name, validationRules[name])}
          id={name}
          type={type}
          name={name}
          {...rest}
          className="border rounded p-1 outline-none"
          onChange={type === "file" ? handleImageChange : undefined}
        />
        {hasError ? (
          <p className="text-red-600" data-cy="product_error">
            {errors[name]?.message?.toString()}
          </p>
        ) : null}
      </div>
    </>
  );
};
export default LabelInput;
