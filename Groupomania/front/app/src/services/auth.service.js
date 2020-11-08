import * as Constants from "../constants/apiconst";

const header = {
    'Content-Type': 'application/json'
};
//let isAuth$ = new BehaviorSubject<boolean>(false);
//let authToken: string;//TODO: store in different cookie, make the server rebuild the tok
/*https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3
* https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js
* */
//let userId: string;

export function createUser(newUser: any) {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_AUTH+'signin', {
            method: 'POST',
            headers: header,
            body: JSON.stringify(newUser)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                //TODO: keep token, go to home page (for now user details page)
                localStorage.setItem('token', data.token);
                resolve(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

export function getToken() {
    return this.authToken;
}

export function getUserId() {
    return this.userId;
}

export function loginUser(userLogins: any) {
    return new Promise((resolve, reject) => {
        fetch(Constants.API_AUTH+'login', {
            method: 'POST',
            headers: header,
            body: JSON.stringify(userLogins)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                //TODO: keep token in secure way
                localStorage.setItem('token', data.token);
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
