import { useRouteError, ErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as ErrorResponse;
    console.error('useRouteError:', error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.data || error.toString()}</i>
            </p>
        </div>
    );
}