import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServerManageService } from "./server-manage.service";


@Component({
    selector: "app-tabs-bootstrap",
    templateUrl: "./server-manage.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [ServerManageService]
})

export class ServerManageComponent implements OnInit {

    errMessage: string;
    serverStatData: any = [];

    constructor(private serverManageService: ServerManageService) {
    }

    ngOnInit() {
        this.getServerStateList();
    }

    getServerStateList() {
        this.serverManageService.getServerStateList()
            .subscribe(
            serverStatData => {
                this.serverStatData = serverStatData
                console.log('this serverStat', this.serverStatData)
            },
            error => this.errMessage = <any>error);
    }
}