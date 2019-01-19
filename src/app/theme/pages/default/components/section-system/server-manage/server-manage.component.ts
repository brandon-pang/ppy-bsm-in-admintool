import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServerManageService } from "./server-manage.service";
import {Helpers} from "../../../../../../helpers";
import {ModalDismissReasons, NgbDateStruct, NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/switchMap';
import * as $ from 'jquery';
declare var swal: any;

@Component({
    selector: "app-tabs-bootstrap",
    templateUrl: "./server-manage.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [ServerManageService]
})

export class ServerManageComponent implements OnInit {

    errMessage: string;
    public modalClose: string;
    public serverStatData: any = [];

    public serverAllStartReturn: any = [];
    public serverSpecStartReturn: any = [];

    public serverAllStopReturn: any = [];
    public serverSpecStopReturn: any = [];

    public serverAllUpdateReturn: any = [];
    public serverSpecUpdateReturn: any = [];

    public allServerOnSet:boolean=true;
    public allServerArSet:boolean=false;
    constructor(private modalService:NgbModal,private serverManageService: ServerManageService) {
    }

    ngOnInit() {
        this.getServerStateList();
    }

    getServerStateList() {
        let res: any = [];
        Helpers.setLoading(true);
        this.serverManageService.getServerStateList()
            .subscribe(
            serverStatData => {
                Helpers.setLoading(false);
                res = serverStatData;
                if (res.result === 100) {
                    this.serverStatData = res.data
                    console.log('this serverStat',  this.serverStatData)
                } else {
                    swal("Error","Result Number is "+res.result, "error");
                }
                console.log('this serverStat', this.serverStatData)
            },
            error => this.errMessage = <any>error);
    }
    getCheckStatAllServer(serverBoo, arBoo){
        console.log(serverBoo, arBoo);
        if(!serverBoo){
            this.getServerAllStop(arBoo)
        }
        else if(serverBoo){
            this.getServerAllStart(arBoo)
        }
    }

    getServerAllStart(boo){
        let res: any = [];
        this.serverManageService.getServerAllStart(boo)
            .subscribe(
                serverAllStartReturn => {
                    res = serverAllStartReturn;
                    console.log('getServerAllStart', res);
                    if (res.result === 100) {
                        this.serverAllStartReturn = res.data[0];
                        this.allServerOnSet=true;
                        this.allServerArSet=boo;
                        swal("Start All Server", "모든 서버가 구동중 입니다.", "success");
                        console.log('this serverStat',  this.serverAllStartReturn)
                    } else {
                        swal("Error","Result Number is "+res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error
                });

    }

    getServerAllStop(boo){
        let res: any = [];
        this.serverManageService.getServerAllStop()
            .subscribe(
                serverAllStopReturn => {
                    res = serverAllStopReturn;
                    if (res.result === 100) {
                        this.serverAllStopReturn = res.data[0];
                        this.allServerOnSet=false;
                        this.allServerArSet=boo;
                        swal("Stop All Server", "모든 서버가 중단 되었습니다.", "success");
                        console.log('this serverStat',  this.serverAllStopReturn)
                    } else {
                        swal("Error","Result Number is "+res.result, "error");
                    }
                },
                error => this.errMessage = <any>error);
    }
    getServerAllUpdate(boo){
        this.serverManageService. getServerAllUpdate(boo)
            .subscribe(
                serverAllUpdateReturn => {
                    this.serverAllUpdateReturn = serverAllUpdateReturn;
                    Helpers.setLoading(false);
                    console.log('this serverStat', this.serverStatData)
                },
                error => this.errMessage = <any>error);
    }
    getServerSpecStart(sname,boo){
        this.serverManageService.getServerSpecStart(sname,boo)
            .subscribe(
                serverSpecStartReturn => {
                    this.serverSpecStartReturn = serverSpecStartReturn;
                    Helpers.setLoading(false);
                    console.log('this serverStat', this.serverStatData)
                },
                error => this.errMessage = <any>error);
    }

    getServerSpecStop(sname){
        this.serverManageService.getServerSpecStop(sname)
            .subscribe(
                serverSpecStopReturn => {
                    this.serverSpecStopReturn = serverSpecStopReturn;
                    Helpers.setLoading(false);
                    console.log('this serverStat', this.serverStatData)
                },
                error => this.errMessage = <any>error);
    }


    getServerUpdate(sname,boo){
        this.serverManageService.getServerUpdate(sname,boo)
            .subscribe(
                serverSpecUpdateReturn => {
                    this.serverSpecUpdateReturn = serverSpecUpdateReturn;
                    Helpers.setLoading(false);
                    console.log('this serverStat', this.serverStatData)
                },
                error => this.errMessage = <any>error);
    }

    setEditOpen(content) {
        this.modalService.open(content).result.then((result) => {
            this.modalClose = `Closed with: ${result}`;
        }, (reason) => {
            this.modalClose = `Dismissed ${this.modalDismissReason(reason)}`;
        });
    }

    private modalDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}