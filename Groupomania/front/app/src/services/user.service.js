import * as Constants from "../constants/apiconst";
import {HandleError} from "../utils/responseHandler";

export function getUserData(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_USER+userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            }})
            .then(HandleError)
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

export function getUserSubscriptions(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_USER+'getsubscriptions/'+userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            }})
            .then(HandleError)
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

export function subscribe(userId: number, subId: number): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_USER+'joinsub/'+userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify({subId: subId})})
            .then(HandleError)
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}
