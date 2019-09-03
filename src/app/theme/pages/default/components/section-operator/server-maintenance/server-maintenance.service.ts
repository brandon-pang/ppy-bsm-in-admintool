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

import { Helpers } from "../../../../../../helpers";

@Injectable()

export class ServerMaintenanceService {
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private apiUrl = this.currentUser.connectIP;
    private apiKey = this.currentUser.apikey;

    constructor(private http: Http) { }

    getGameInfoData(): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/GetCodeInfo/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }

    getTableData(): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/GetTableList/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }

    getBundleID(): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/GetCurrentBundleID/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }

    setBundleID(id): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/SetBundleID/?key=${this.apiKey}&bundleID=${id}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }

    getServerInspectData(region, type): Observable<any[]> {
        Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/GetTableData/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&type=${type}&hashKey=${region}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    setServerInspectData(region, startDate, endDate, state, message): Observable<any[]> {
        Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/ServerInspect/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&region=${region}&start=${startDate}&end=${endDate}&state=${state}&message=${message}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    private extractData(res: Response) {
        Helpers.setLoading(false);
        let body = res.json();
        return body || {};
    }
}
