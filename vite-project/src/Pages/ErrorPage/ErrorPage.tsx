import React from "react";
import ErrorComponent from "../../Components/Error/ErrorComponent";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const error = useRouteError();

    return (
        <>{isRouteErrorResponse(error) && <ErrorComponent error={error} />}</>
    );
};

export default ErrorPage;
