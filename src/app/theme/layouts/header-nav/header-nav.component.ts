import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {


    constructor() { }
    public userID: string = '';
    public userIP: string = '';
    ngOnInit() {
        let getUserName = JSON.parse(localStorage.getItem('currentUser'));
        this.userID = getUserName.userid;
        this.userIP = getUserName.connectIP;
    }
    ngAfterViewInit() {
        mLayout.initHeader();
    }

}
