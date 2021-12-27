import { FC } from "react";

export interface AlertProps {
  text: string;
  type?: "warning" | "info" | "error" | "success";
}

const bgColors = {
  warning: {
    bg: "bg-yellow-500",
    fg: "text-white",
  },
  info: {
    bg: "bg-blue-500",
    fg: "text-white",
  },
  error: {
    bg: "bg-red-500",
    fg: "text-white",
  },
  success: {
    bg: "bg-green-500",
    fg: "text-white",
  },
};

export const Alert: FC<AlertProps> = ({ text, type = "info" }) => {
  return (
    <div
      className={`${bgColors[type].bg} p-4 flex sm:flex-row sm:justify-between items-center flex-col`}
    >
      <p className={`${bgColors[type].fg} font-medium text-white truncate`}>
        <span className="inline">{text}</span>
      </p>
    </div>
  );
};
