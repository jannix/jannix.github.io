import * as Constants from "../constants/apiconst";
import {HandleError} from "../utils/responseHandler";

export function createPost(newPost: any): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_POST+'create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify(newPost)})
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

export function getPostBySubId(subId: number): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_POST+'getpostsbysub/'+subId, {
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
                //reject(error);
            });
    });
}

export function getPostById(postId: number): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_POST+'getpost/'+postId, {
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

