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

export function updatePost(updatedPost: any, postId: number): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_POST+'postedit/'+ postId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify(updatedPost)})
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

export function deletePost(postId: number): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_POST + postId, {
            method: 'DELETE',
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

export function updatePostLikes(postId: number, like: number): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_POST+'like/'+postId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify({
                like: like,
                userId: localStorage.getItem('user-id'),
            })})
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

export function getPostById(id: number, api_path: string = 'getpost/'): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_POST+api_path+id, {
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

