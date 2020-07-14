import { AfterViewInit, Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbDateStruct, NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ServerMaintenanceService } from "./server-maintenance.service";
import { ScriptLoaderService } from '../../../../../../_services/script-loader.service';
import { Helpers } from '../../../../../../helpers';
import * as $ from 'jquery';
declare var swal: any;

@Component({
    selector: "app-widgets-bootstrap-datetimepicker",
    templateUrl: "./server-maintenance.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [ServerMaintenanceService]
})
export class ServerMaintenanceComponent implements OnInit, AfterViewInit {
    @Input() errMessage: string;
    @Input('ngModel') model: any;
    public gameInfoData: any = [];
    public tableData: any = [];
    public serverInspectData: any = [];
    public serverInspectEditData: any = [];
    public bundleIdData: any = [];
    public modalClose: string;
    public isBundleModify: boolean = true;
    private newBundleID: any = '';

    constructor(
        private modalService: NgbModal,
        private serverMaintenanceService: ServerMaintenanceService,
        private _script: ScriptLoaderService) { }

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
                    this.getBundleID();
                } else {
                    swal("It can't find table data", "Result Number is " + res.result, "error");
                }
            },
            error => this.errMessage = <any>error);
    }
    getGameItemInfo() {
        let res: any = [];
        this.serverMaintenanceService.getGameInfoData()
            .subscribe(
            gameInfoData => {
                res = gameInfoData;
                console.log(' this.gameInfoData', res)
                if (res.result === 100) {
                    this.gameInfoData = res.data;
                } else {
                    swal("It can't find table data", "Result Number is " + res.result, "error");
                }
            },
            error => this.errMessage = <any>error);
    }
    getBundleID() {
        let res: any = [];
        this.serverMaintenanceService.getBundleID()
            .subscribe(
            bundleIdData => {
                res = bundleIdData;
                console.log(' this.bundleIdData', res)
                if (res.result === 100) {
                    this.bundleIdData = res.data;
                } else {
                    swal("It can't find table data", "Result Number is " + res.result, "error");
                }
            },
            error => this.errMessage = <any>error);
    }

    setBundleID(id) {
        let res: any = [];
        if (id === '') {
            return;
        }
        this.serverMaintenanceService.setBundleID(id)
            .subscribe(
            bundleIdData => {
                res = bundleIdData;
                console.log(' this.bundleIdReturn', res)
                if (res.result === 100) {
                    if (res.data[0].result) {
                        this.getBundleID();
                        this.isBundleModify = true;
                    } else {
                        swal("Please Retry", "Result Number is " + res.result, "error");
                        this.newBundleID = id;
                        this.isBundleModify = false;
                        $('#sty_bundle').css({ "color": "red", "font-weight": "bold" })
                        $('#sty_bundle').text(id);
                    }
                } else {
                    swal("A data has found error", "Result Number is " + res.result, "error");
                }
            },
            error => this.errMessage = <any>error);
    }
    getServerInspectData() {
        let res: any = [];
        let region: number = 1;
        let type: number = 0;
        let dataName: string;
        for (let i in this.tableData) {
            if (this.tableData[i].DataName === "ServerInspect") {
                type = +this.tableData[i].Type;
                dataName = this.tableData[i].DataName
                console.log(type);
            }
        }
        this.serverMaintenanceService.getServerInspectData(region, type)
            .subscribe(
            serverInspectData => {
                res = serverInspectData;
                console.log(' this.serverInspectData', res)
                if (res.result === 100) {
                    this.serverInspectData = res.data;
                    if (this.serverInspectData[0].inspectState == '1') {
                        this.serverInspectData[0].descState = '오픈';
                    } else if (this.serverInspectData[0].inspectState == '2') {
                        this.serverInspectData[0].descState = '내부 오픈'
                    } else if (this.serverInspectData[0].inspectState == '128') {
                        this.serverInspectData[0].descState = '닫음';
                    } else {
                        this.serverInspectData[0].descState = '에러';
                    }
                    for (let i in this.gameInfoData[0].REGION_CODE_LIST) {
                        let chkRegionCode = this.gameInfoData[0].REGION_CODE_LIST[i].Value;
                        if (chkRegionCode == region) {
                            console.log(chkRegionCode)
                            this.serverInspectData[0].descRegion = this.gameInfoData[0].REGION_CODE_LIST[i].DescName;
                        }
                    }
                    console.log(this.serverInspectData)
                } else {
                    swal("It can't find " + dataName + " data", "Result Number is " + res.result, "error");
                }
            },
            error => {
                this.errMessage = <any>error;
            });
    }

    setServerInspectData(region, startDate, endDate, state, message) {
        let res: any = [];
        console.log(' this.serverInspectEditData', region, startDate, endDate, state, message)
        this.serverMaintenanceService.setServerInspectData(region, startDate, endDate, state, message)
            .subscribe(
            serverInspectEditData => {
                res = serverInspectEditData;
                console.log(' this.serverInspectEditData', res)
                if (res.result === 100) {
                    this.serverInspectEditData = res.data;

                    this.serverInspectData[0].startTime = res.data[0].start;
                    this.serverInspectData[0].endTime = res.data[0].end;

                    if (res.data[0].serverState == '0') {
                        this.serverInspectData[0].descState = '오픈';
                    } else if (res.data[0].serverState == '2') {
                        this.serverInspectData[0].descState = '내부 오픈'
                    } else if (res.data[0].serverState == '128') {
                        this.serverInspectData[0].descState = '닫음';
                    } else {
                        this.serverInspectData[0].descState = '에러';
                    }
                    swal("서버 점검 설정 완료", "start " + res.data[0].start + " to " + res.data[0].end + "<br> state" + res.data[0].serverState, "success");
                    console.log(this.serverInspectEditData);
                } else {
                    swal("It can't find data", "Result Number is " + res.result, "error");
                }
            },
            error => {
                this.errMessage = <any>error;
            });
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
