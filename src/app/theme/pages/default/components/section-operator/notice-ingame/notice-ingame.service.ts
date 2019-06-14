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

export class NoticeIngameService{
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private apiUrl = this.currentUser.connectIP;
    private apiKey = this.currentUser.apikey;

    constructor(private http:Http){ }

    setNoticeData(msg): Observable<any[]> {
        Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/Notice/?key=${this.apiKey}&message=${msg}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError)
    }

    private extractData(res: Response) {
        Helpers.setLoading(false);
        let body = res.json();
        return body || {};
    }
}
