import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
}

export const Button: FC<ButtonProps> = ({
  className = "",
  label,
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-pink-600 dark:text-gray-800 bg-white hover:bg-pink-50 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};
