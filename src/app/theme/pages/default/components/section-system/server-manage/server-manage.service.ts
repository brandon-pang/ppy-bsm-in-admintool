import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { handleError } from '../../../async-handling.observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {Helpers} from "../../../../../../helpers";

@Injectable()

export class ServerManageService {
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private apiUrl = Helpers.apiUrl;
    private apiKey = this.currentUser.apikey;

    constructor(private http: Http) { }

    getServerStateList(): Observable<any[]> {
        //Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/ServerStateList/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}