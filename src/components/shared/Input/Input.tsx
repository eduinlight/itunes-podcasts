import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input: FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`border-2 rounded-md h-[46px] px-3 text-gray-800 ${className}`}
      {...props}
    />
  );
};
