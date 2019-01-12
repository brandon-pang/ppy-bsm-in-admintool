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
    private apiUrl = 'http://122.199.219.189:9001';
    private apiKey='test_key';

    constructor(private http: Http) { }

    getServerStateList(): Observable<any[]> {
        //Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/ServerStateList/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }
    getGameInfoData():Observable<any[]>{
        //Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/GetCodeInfo/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }

    getTableData(): Observable<any[]> {
        //Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/GetTableList/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }

    getServerInspectData(region, type): Observable<any[]> {
        let targetUrl = `${this.apiUrl}/WAPI/GetTableData/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&type=${type}&hashKey=${region}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    setServerInspectData(region,startDate,endDate,state,message): Observable<any[]> {
        let targetUrl = `${this.apiUrl}/WAPI/ServerInspect/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&region=${region}&start=${startDate}&end=${endDate}&state=${state}&message=${message}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    private extractData(res: Response) {
        //Helpers.setLoading(false);
        let body = res.json();
        return body || {};
    }
}