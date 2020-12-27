import React, {useEffect, useState} from 'react';
import {useParams, useHistory, useLocation} from "react-router-dom";
import './_sub-page.scss';
import Header from "../common/Header.component";
import MainDisplay from "../common/MainDisplay.component";
import {getSubsByTitle} from "../../services/sub.service";


function SubPage(props) {
    let history = useHistory();
    const {state} = useLocation();
    //const { sub } = state;
    const [sub, setSub] = useState(state? state.sub: null);
    let { subName } = useParams();

    useEffect(() => {
        let mounted = true;
        if (!sub || sub.title !== subName) {
            getSubsByTitle(subName).then(res => {//TODO: make fct for exact title
                if (mounted) {
                    setSub(res.subsFound[0]);
                }
            });
        }
        return () => mounted = false;
    }, [sub, subName]);

    return (
        <div className="sub-page-container">
            <Header routerHistory={history}/>
            {sub && <MainDisplay subData={sub}/>}

        </div>
    );
}

export default SubPage;
