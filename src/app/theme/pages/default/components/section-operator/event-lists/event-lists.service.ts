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
declare function require(name:string);
const LosslessJSON = require('lossless-json');

@Injectable()

export class EventListsService{
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private apiUrl = this.currentUser.connectIP;
    private apiKey = this.currentUser.apikey;

    constructor(private http:Http){ }
    getGameInfoData():Observable<any[]>{
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/GetCodeInfo/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }

    getEventListsData(): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/GetEventList/?key=${this.apiKey}`;
        return this.http
            .get(encodeURI(url))
            .map(this.extractData)
            .catch(handleError)
    }
    setEventListRemove(id): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/DeleteEvent/?key=${this.apiKey}&eventId=${id}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError)
    }
    setEventListAdd(title, itemCode, count, msg, type, start, end): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/AddEvent/?key=${this.apiKey}&title=${title}&itemCode=${itemCode}&count=${count}&message=${msg}&postType=${type}&start=${start}&end=${end}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError)
    }

    private extractData(res: Response) {
        Helpers.setLoading(false);
        let body = LosslessJSON.parse(res.text());
        return body || {};
    }
}
