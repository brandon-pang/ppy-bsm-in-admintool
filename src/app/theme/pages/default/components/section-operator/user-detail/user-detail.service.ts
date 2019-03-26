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

export class UserDetailService {
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private apiUrl = Helpers.apiUrl;
    private apiKey = this.currentUser.apikey;

    constructor(private http: Http) { }

    getParamData(id: string): Observable<any[]> {
        //Helpers.setLoading(true);
        let wikiUrl = `${this.apiUrl}/WAPI/FindNamePlayer/?key=${this.apiKey}`;
        let url = `${wikiUrl}&name=${id}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError)
    }

    getInventoryData(type, id): Observable<any[]> {
        //Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/GetTableData/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&type=${type}&hashKey=${id}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    getPostItemData(type: number, id: number): Observable<any[]> {
        //Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/GetTableData/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&type=${type}&hashKey=${id}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }
    removePostItemData(playerid,postid): Observable<any[]> {
        let targetUrl = `${this.apiUrl}/WAPI/RemovePost/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&playerID=${playerid}&postID=${postid}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    setSendItemMail(id, itemCode, count, sender, message): Observable<any[]> {
        //Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/AddPost/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&playerID=${id}&itemCode=${itemCode}&count=${count}&senderName=${sender}&message=${message}`;
        return this.http
            .get(setUrl)
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

    getGameInfoData():Observable<any[]>{
        //Helpers.setLoading(true);
        let url = `${this.apiUrl}/WAPI/GetCodeInfo/?key=${this.apiKey}`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(handleError);
    }

    setUserBlock(id: string, sec: string, text: string): Observable<any[]> {
        //Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/UserBlock/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&playerID=${id}&second=${sec}&reason=${text}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    setChangeGold(id:string,param:string): Observable<any[]> {
        //Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/ModifyGold/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&playerID=${id}&gold=${param}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    setChangeGem(id:string,param1:string,param2:string): Observable<any[]> {
        //Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/ModifyGem/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&playerID=${id}&gem=${param1}&bonusgem=${param2}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    setChangeUserGrade(id: string, grade: string): Observable<any[]> {
        let targetUrl = `${this.apiUrl}/WAPI/ChangeUsreGrade/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&playerID=${id}&grade=${grade}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }

    setInvenItem(id: string, itemCode:string, count:string,
                 level: string, expriy:string, skinCode:string): Observable<any[]> {
        let targetUrl = `${this.apiUrl}/WAPI/ModifyItem/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&playerID=${id}&itemCode=${itemCode}&count=${count}&level=${level}&expriy=${expriy}&skinCode=${skinCode}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }
    setInvenRemoveItem(id: string, itemCode:string): Observable<any[]> {
        let targetUrl = `${this.apiUrl}/WAPI/RemoveItem/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&playerID=${id}&itemCode=${itemCode}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }
    getFriendListData(type,id): Observable<any[]> {
        //Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/GetTableData/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&type=${type}&hashKey=${id}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }
    getClanListData(type, id): Observable<any[]> {
        //Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/GetTableData/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&type=${type}&hashKey=${id}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }
    getGoogleBillingData(type, id): Observable<any[]> {
        //Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/GetTableData/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&type=${type}&hashKey=${id}`;
        return this.http
            .get(setUrl)
            .map(this.extractData)
            .catch(handleError);
    }
    getAppleBillingData(type, id): Observable<any[]> {
        //Helpers.setLoading(true);
        let targetUrl = `${this.apiUrl}/WAPI/GetTableData/?key=${this.apiKey}`;
        let setUrl = `${targetUrl}&type=${type}&hashKey=${id}`;
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
