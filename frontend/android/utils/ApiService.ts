
export class ApiService {

    static baseUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

    static executeRequest(url: string, method: string, body: Object, token?: string) {
        url = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
        console.log("Url : ",url)
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'authorization': token ? `Token ${token}` : '',
            },
            body: JSON.stringify(body),
        });
    }

    static post(url: string, body: Object, token?: string) {
        return this.executeRequest(url, 'POST', body, token);
    }

    static get(url: string, token?: string) {
        return this.executeRequest(url, 'GET', null, token);
    }

    static put(url: string, body: Object, token?: string) {
        return this.executeRequest(url, 'PUT', body, token);
    }

    static delete(url: string, token?: string) {
        return this.executeRequest(url, 'DELETE', null, token);
    }


    static register(body: Object) {
        const url = `${this.baseUrl}/api/accounts/register/`;
        return this.executeRequest(url, 'POST', body);
    }


    static login(body: Object) {
        const url = `${this.baseUrl}/api/accounts/login/`;
        return this.executeRequest(url, 'POST', body);
    }

    static getProfile(token: string) {
        const url = `${this.baseUrl}/api/accounts/profile/`;
        return this.executeRequest(url, 'GET', null);
    }

    static updateProfile(body: Object) {
        const url = `${this.baseUrl}/api/accounts/profile/`;
        return this.executeRequest(url, 'PUT', body);
    }

    static createGroup(body: Object) {
        const url = `${this.baseUrl}/api/chats/groups/`;
        return this.executeRequest(url, 'POST', body);
    }

    static addGroupMember(body: Object) {
        const url = `${this.baseUrl}/api/chats/groups/add-member/`;
        return this.executeRequest(url, 'POST', body);
    }
}

export default ApiService;
