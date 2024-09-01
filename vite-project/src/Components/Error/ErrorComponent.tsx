import React from "react";
import { ErrorResponse } from "react-router-dom";

type Props = {
    error: ErrorResponse;
};

const ErrorComponent: React.FC<Props> = ({ error }): JSX.Element => {
    console.log(error);
    return (
        <div>
            <h1 className="text-5xl">{error.status} 😓</h1>
            <h2>{error.statusText}</h2>
            <p>{error.data}</p>
        </div>
    );
};

export default ErrorComponent;
