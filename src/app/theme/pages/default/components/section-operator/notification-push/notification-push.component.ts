import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbDateStruct, NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotificationPushService } from "./notification-push.service";
import { ScriptLoaderService } from '../../../../../../_services/script-loader.service';
import { Helpers } from "../../../../../../helpers";
import 'rxjs/add/operator/switchMap';
import * as $ from 'jquery';
import { isNgTemplate } from "@angular/compiler";
declare var swal: any;

@Component({
    selector: "app-widgets-bootstrap-datetimepicker",
    templateUrl: "./notification-push.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [NotificationPushService]
})

export class NotificationPushComponent implements OnInit {
    @Input()
    public getPushJobData: any = [];
    public errMessage: string;
    public modalClose: string;
    public gameInfoData: any = [];
    public setJoinListData: any = [];
    public jobID: string = '';
    public rowID: string = '';
    public setDelPushJobData: any = [];
    constructor(
        private notificationPushService: NotificationPushService,
        private modalService: NgbModal,
        private _script: ScriptLoaderService,

    ) { }
    ngOnInit(): void {
        this.getGameItemInfo();

    }
    getPushJob() {
        let res: any = [];
        this.notificationPushService.getPushJob()
            .subscribe(
            getPushJobData => {
                res = getPushJobData;
                if (res.result === 100) {
                    this.getPushJobData = res.data;
                    console.log('this.getPushJobData', res)
                    //swal("성공", "리스트 조회가 완료 되었습니다.", "success");
                    console.log(this.getPushJobData);
                    if (this.getPushJobData.length !== 0) {
                        for (let a in this.getPushJobData[0]) {
                            let region = this.getPushJobData[0][a].channel;
                            if (region !== '') {
                                for (let i in this.gameInfoData[0].REGION_CODE_LIST) {
                                    let chkRegionCode = this.gameInfoData[0].REGION_CODE_LIST[i].Value;
                                    if (chkRegionCode == region) {
                                        console.log(chkRegionCode)
                                        this.getPushJobData[0][a].region = this.gameInfoData[0].REGION_CODE_LIST[i].DescName;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    swal("It can't find data", "Result Number is " + res.result, "error");
                }
            },
            error => {
                this.errMessage = <any>error;
            });
    }
    getGameItemInfo() {
        let res: any = [];
        this.notificationPushService.getGameInfoData()
            .subscribe(
            gameInfoData => {
                res = gameInfoData;
                console.log(' this.gameInfoData', res)
                if (res.result === 100) {
                    this.gameInfoData = res.data;
                    this.getPushJob();
                } else {
                    swal("It can't find table data", "Result Number is " + res.result, "error");
                }
            },
            error => this.errMessage = <any>error);
    }

    setJoinListPush(jobID, channel, title, body, when) {
        let res: any = [];
        this.notificationPushService.setJoinListPush(jobID, channel, title, body, when)
            .subscribe(
            setJoinListData => {
                res = setJoinListData;
                console.log(' this.setJoinListData', res)
                if (res.result === 100) {
                    this.setJoinListData = res.data;
                    if (jobID == 0) {
                        swal("성공", "Push가 등록 되었습니다.", "success");
                    } else {
                        swal("성공", "Push가 수정 되었습니다.", "success");
                    }
                    this.getPushJob();
                    //console.log(this.getPushJobData);
                } else {
                    swal("It can't find data", "Result Number is " + res.result, "error");
                }
            },
            error => {
                this.errMessage = <any>error;
            });
    }

    setDelPushJob(jobID) {
        let res: any = [];
        this.notificationPushService.setDelPushJob(jobID)
            .subscribe(
            setDelPushJobData => {
                res = setDelPushJobData;
                console.log(' this.setDelPushJobData', res)
                if (res.result === 100) {
                    this.setDelPushJobData = res.data;
                    this.getPushJob();
                    swal("성공", "삭제가 완료 되었습니다.", "success");
                    //console.log(this.getPushJobData);

                } else {
                    swal("Error", "Result Number is " + res.result, "error");
                }
            },
            error => {
                this.errMessage = <any>error;
            });
    }

    setRegistJobModal(content) {
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/bootstrap-datetimepicker.js']);
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/select2.js']);

        this.modalService.open(content).result.then((result) => {
            this.modalClose = `Closed with: ${result}`;

        }, (reason) => {
            this.modalClose = `Dismissed ${this.modalDismissReason(reason)}`;
        });
    }

    setEditJobModal(rowID, jobID, content) {
        this.rowID = rowID;
        this.jobID = jobID;

        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/bootstrap-datetimepicker.js']);
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/select2.js']);

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