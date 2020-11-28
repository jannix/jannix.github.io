import * as Constants from "../constants/apiconst";
import {HandleError} from "../utils/responseHandler";

export function createSub(newSub: any): Promise<any>  {
    console.log(newSub);
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
