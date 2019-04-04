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
    private apiUrl = this.currentUser.connectIP;
    private apiKey = this.currentUser.apikey;

    constructor(private http: Http) { }

    getServerStateList(): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/ServerStateList/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }
    getServerAllStart(boo:string): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/StartAllServer/?key=${this.apiKey}`;
        let paramUrl=`${url}&autoRestart=${boo}`;
        return this.http
            .get(paramUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    getServerAllStop(): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/StopAllServer/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }
    getServerAllUpdate(boo): Observable<any[]>{
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/UpdateAllServer/?key=${this.apiKey}`;
        let paramUrl=`${url}&autoRestart=${boo}`;
        return this.http
            .get(paramUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    getServerSpecStart(sname,boo){
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/StartServer/?key=${this.apiKey}`;
        let paramUrl=`${url}&serverName=${sname}&autoRestart=${boo}`;
        return this.http
            .get(paramUrl)
            .map(this.extractData)
            .catch(handleError);
    }


    getServerSpecStop(sname): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/StopServer/?key=${this.apiKey}`;
        let paramUrl=`${url}&serverName=${sname}`;
        return this.http
            .get(paramUrl)
            .map(this.extractData)
            .catch(handleError);
    }


    getServerUpdate(sname, boo): Observable<any[]>{
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/UpdateServer/?key=${this.apiKey}`;
        let paramUrl=`${url}&serverName=${sname}&autoRestart=${boo}`;
        return this.http
            .get(paramUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    getAllKickUser(msg): Observable<any[]>{
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/AllKick/?key=${this.apiKey}`;
        let paramUrl=`${url}&message=${msg}`;
        return this.http
            .get(paramUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    private extractData(res: Response) {
        Helpers.setLoading(false);
        let body = res.json();
        return body || {};
    }
}
