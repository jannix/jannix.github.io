import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './_toast.scss';

const Toast = props => {
    const { toastList, position, autoDelete, dismissTime } = props;
    const [list, setList] = useState(toastList);
    let aliveTime = 0;

    const deleteToast = id => {
        console.log('Delete toast');
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    };

    useEffect(() => {
        setList([...toastList]);
        console.log('setList([...toastList]) => ' + list[0]);
    }, [toastList]);

   /* useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length && (aliveTime >= dismissTime)) {
                console.log('delete from time');
                deleteToast(toastList[0].id);
            } else {
                aliveTime = aliveTime + 1;
                console.log('dismissTime ' + dismissTime);
                console.log(aliveTime);
            }
        }, dismissTime);

        return () => {
            console.log('clearInterval');
            clearInterval(interval);
        }
    }, [toastList, autoDelete, dismissTime, list]);*/

    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    list.map((toast, i) => {
                        return (
                            <div key={i} className={`notification toast ${position}`} style={{ backgroundColor: toast.backgroundColor }}>
                                <button onClick={() => deleteToast(toast.id)}>X</button>
                                <div className="notification-image">
                                    <img src={toast.icon} alt="" />
                                </div>
                                <div>
                                    <p className="notification-title">{toast.title}</p>
                                    <p className="notification-message">
                                        {toast.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

Toast.propTypes = {
    toastList: PropTypes.array.isRequired,
    position: PropTypes.string,
    autoDelete: PropTypes.bool,
    dismissTime: PropTypes.number
};

export default Toast;
