import React, {useState} from 'react';
import './_home-page.scss';
import LogoConnection from "./../logo/Logo.component";


function HomePage(props) {

    return (
        <div className="home-page-container">
            <LogoConnection/>
        </div>
    );
}

export default HomePage;
