import React, {Fragment} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoute from "./router/AppRoute";

const App = () => {
    return (
        <Fragment>

            <BrowserRouter>
                <AppRoute/>
            </BrowserRouter>

        </Fragment>
    );
};

export default App;
