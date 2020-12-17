import React from 'react';
import {useParams, useHistory} from "react-router-dom";
import './_sub-page.scss';
import Header from "../common/Header.component";


function SubPage() {
    let history = useHistory();

    let { subName } = useParams();

    return (
        <div className="sub-page-container">
            <Header routerHistory={history}/>
            {/*TODO: main display should be a view component*/}
            <p>PAGE { subName }</p>
        </div>
    );
}

export default SubPage;
