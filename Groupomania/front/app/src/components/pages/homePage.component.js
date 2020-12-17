import React from 'react';
import { useHistory } from "react-router-dom";
import './_home-page.scss';
import Header from "../common/Header.component";
import MainDisplay from "../common/MainDisplay.component";


function HomePage() {
    let history = useHistory();

    return (
        <div className="home-page-container">
            <Header routerHistory={history}/>
            {/*TODO: main display should be a view component*/}
            <MainDisplay/>
        </div>
    );
}

export default HomePage;
