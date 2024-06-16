import React from "react";

interface ButtonProps {
  onClick?: () => void;
  title?: string;
}
const Button = ({ onClick, title }: ButtonProps) => {
  return (
    <button
      className="bg-zinc-950 text-zinc-200 w-36 py-3 mt-5 rounded-md uppercase text-xs font-semibold hover:bg-red-700 hover:text-white"
      onClick={onClick}
    >
      {title ? title : "Reset Cart"}
    </button>
  );
};

export default Button;
