import * as Constants from "../constants/apiconst";
import {HandleError} from "../utils/responseHandler";

//let isAuth$ = new BehaviorSubject<boolean>(false);
//let authToken: string;//TODO: store in different cookie, make the server rebuild the tok
/*https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3
* https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js
* */
//let userId: string;

export function createUser(newUser: any): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_USER+'auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify(newUser)})
            .then(HandleError)
            .then(data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user-id', data.userId);
                resolve(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

export function loginUser(userLogins: any): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_USER+'auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify(userLogins)
        }).then(HandleError)
            .then(data => {
                //TODO: keep token in secure way
                localStorage.setItem('token', data.token);
                localStorage.setItem('user-id', data.userId);
                resolve(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

export function editUser(userId: number, editedUser: any): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_USER+'useredit/'+userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify(editedUser)})
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

export function deleteUser(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_USER + userId, {
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

export function editMail(userId: number, logins: any): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_USER+'/emailedit/'+userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify(logins)})
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

export function editPassword(userId: number, logins: any): Promise<any>  {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_USER+'/passwordedit/'+userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'userId': localStorage.getItem('user-id'),
            },
            body: JSON.stringify(logins)})
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

export function logout() {
    localStorage.removeItem('token');
}
