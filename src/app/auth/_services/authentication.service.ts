import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Helpers } from '../../helpers';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {
    }

    login(id: string, password, connectIP) {
        let targetUrl = `${connectIP}/WAPI/Auth/?`;
        let setUrl = `${targetUrl}user=${id}&hash=${password}`;
        //console.log(password);
        return this.http
            .get(setUrl)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response;
                let user = response.json();
                return user || {};
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
