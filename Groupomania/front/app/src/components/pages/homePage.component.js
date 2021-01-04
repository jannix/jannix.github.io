import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import './_home-page.scss';
import Header from "../common/Header.component";
import MainDisplay from "../common/MainDisplay.component";
import {getUserData} from "../../services/user.service";


function HomePage() {
    let history = useHistory();

    const [user, setUser] = useState(null);

    useEffect(() => {
        let mounted = true;
        if (!user) {
            getUserData(localStorage.getItem('user-id')).then(res => {
                if (mounted) {
                    setUser(res.userFound);
                }
            }).catch(error => {
                history.push('/login');
            });
        }
        return () => mounted = false;
    }, [user]);

    return (
        <div className="home-page-container">
            <Header routerHistory={history}/>
            {/*TODO: main display should be a view component*/}
            {user && <MainDisplay userData={user}/>}
        </div>
    );
}

export default HomePage;
