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
    }, [history, user]);

    return (
        <div className="home-page-container">
            <Header routerHistory={history}/>
            <h1>Mes Discussions Groupomania</h1>
            {user && <MainDisplay routerHistory={history} userData={user}/>}
        </div>
    );
}

export default HomePage;
