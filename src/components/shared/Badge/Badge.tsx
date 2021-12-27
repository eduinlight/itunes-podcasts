import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

export interface BadgeProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  value: string | number;
}

export const Badge: FC<BadgeProps> = ({ className = "", value, ...props }) => {
  return (
    <div
      className={`text-white font-bold font-xl bg-primary rounded-md px-1 ${className}`}
      {...props}
    >
      {value}
    </div>
  );
};
