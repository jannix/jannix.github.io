import * as Constants from "../constants/apiconst";
import {HandleError} from "../utils/responseHandler";

export function createSub(newSub: any): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_SUB+'create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify(newSub)})
            .then(HandleError)
            .then(data => {
                console.log(data);
                resolve(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

export function updateSub(editedSub: any, subId: number): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_SUB+'subedit/'+subId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify(editedSub)})
            .then(HandleError)
            .then(data => {
                console.log(data);
                resolve(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

export function getSubsByTitle(subName: string): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_SUB+'getbytitle/'+subName, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            }
            })
            .then(HandleError)
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

