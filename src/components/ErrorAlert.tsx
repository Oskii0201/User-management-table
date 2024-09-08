import React from "react";

interface ErrorAlertProps {
    errorMessage: string;
}
export const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorMessage }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex gap-4 bg-red-100 p-4 rounded-md">
                <div className="space-y-1 text-sm">
                    <h6 className="font-medium text-red-900">Something seriously bad happened!</h6>
                    <p className="text-red-700 leading-tight">{errorMessage}</p>
                </div>
            </div>
        </div>
    );
}