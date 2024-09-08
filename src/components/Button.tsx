import React from "react";

interface ButtonProps {
    children: string;
    onClick: any;
    color: "red" | "green" | "blue";
}
export const Button: React.FC<ButtonProps> = ({children, onClick, color }) => {
    const colorClass = {
        red: "bg-red-500 hover:bg-red-600",
        green: "bg-green-500 hover:bg-green-600",
        blue: "bg-blue-500 hover:bg-blue-600",
    }[color];

    return (
        <button
            onClick={onClick}
            className={`${colorClass} text-white px-4 py-2 rounded-lg`}
        >
            {children}
        </button>
    );
}