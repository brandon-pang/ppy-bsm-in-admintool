import { AfterViewInit, Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServerMaintenanceService } from "./server-maintenance.service";
import { ScriptLoaderService } from '../../../../../../_services/script-loader.service';
import { Pipe, PipeTransform } from "@angular/core";
import { Helpers } from '../../../../../../helpers';
import * as $ from 'jquery';
import {Observable} from "rxjs";
import {handleError} from "../../async-handling.observable";
declare var swal: any;

@Component({
    selector: "app-widgets-bootstrap-datetimepicker",
    templateUrl: "./server-maintenance.component.html",
    encapsulation: ViewEncapsulation.None,
    providers:[ServerMaintenanceService]
})
export class ServerMaintenanceComponent implements OnInit, AfterViewInit {
    @Input()
    errMessage:string;
    public gameInfoData:any=[];
    public tableData:any=[];
    public serverInspectData:any=[];
    public serverInspectEditData:any=[];

    constructor(
        private serverMaintenanceService:ServerMaintenanceService,
        private _script: ScriptLoaderService) {}

    ngOnInit() {
        this.getTableList();
        this.getGameItemInfo();
    }
    ngAfterViewInit() {
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/bootstrap-datetimepicker.js']);
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/select2.js']);
    }

    getTableList(): void {
        let res: any = [];
        this.serverMaintenanceService.getTableData()
            .subscribe(
                tableData => {
                    res = tableData;
                    console.log(' this.tableData', res)
                    if (res.result === 100) {
                        this.tableData = res.data;
                        this.getServerInspectData();
                    }else{
                        swal("It can't find table data", "Result Number is "+res.result, "error");
                    }
                },
                error => this.errMessage = <any>error);
    }

    getGameItemInfo(){
        let res: any = [];
        this.serverMaintenanceService.getGameInfoData()
            .subscribe(
                gameInfoData => {
                    res = gameInfoData;
                    console.log(' this.gameInfoData', res)
                    if (res.result === 100) {
                        this.gameInfoData = res.data;
                    }else{
                        swal("It can't find table data", "Result Number is "+res.result, "error");
                    }
                },
                error => this.errMessage = <any>error);
    }

    getServerInspectData() {
        let res: any = [];
        let region:number=0;
        let type: number = 0;
        let dataName:string;
        for (let i in this.tableData) {
            if (this.tableData[i].DataName === "ServerInspect") {
                type = +this.tableData[i].Type;
                dataName=this.tableData[i].DataName
                console.log(type);
            }
        }
        this.serverMaintenanceService.getServerInspectData(region,type)
            .subscribe(
                serverInspectData => {
                    res = serverInspectData;
                    console.log(' this.serverInspectData', res)
                    if (res.result === 100) {
                        this.serverInspectData=res.data
                        console.log(this.serverInspectData)
                    } else {
                        swal("It can't find "+dataName+" data", "Result Number is "+res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }

    setServerInspectData(region,startDate,endDate,state,message) {
        let res: any = [];
        console.log(' this.serverInspectEditData', region,startDate,endDate,state,message)
        this.serverMaintenanceService.setServerInspectData(region,startDate,endDate,state,message)
            .subscribe(
                serverInspectEditData => {
                    res = serverInspectEditData;
                    console.log(' this.serverInspectEditData', res)
                    if (res.result === 100) {
                        this.serverInspectEditData=res.data;
                        this.serverInspectData=res.data;
                        if(this.serverInspectData[0].serverState == '0'){
                            this.serverInspectData[0].descState='오픈';
                        }else if(this.serverInspectData[0].serverState == '2'){
                            this.serverInspectData[0].descState='내부 오픈'
                        }else if(this.serverInspectData[0].serverState == '128'){
                            this.serverInspectData[0].descState='닫음';
                        }else{
                            this.serverInspectData[0].descState='에러';
                        }

                        swal("서버 점검 설정 완료", "start "+this.serverInspectData[0].start+" to "+this.serverInspectData[0].end+"<br> state"+this.serverInspectData[0].serverState, "success");
                        console.log(this.serverInspectEditData)

                    } else {
                        swal("It can't find data", "Result Number is "+res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }
}