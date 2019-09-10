import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbDateStruct, NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventListsService } from './event-lists.service';
import { ScriptLoaderService } from '../../../../../../_services/script-loader.service';
import { Helpers } from "../../../../../../helpers";
import 'rxjs/add/operator/switchMap';
import * as $ from 'jquery';

declare var swal: any;

@Component({
    selector: "app-widgets-bootstrap-datetimepicker",
    templateUrl: "./event-lists.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [EventListsService]
})

export class EventListsComponent implements OnInit, AfterViewInit {

    @Input('ngModel') model: any;
    errTitle: string = "";
    errMessage: string = "";
    eventData: any = [];
    eventListRemoveData: any = [];
    eventListAddData: any = [];
    gameInfoData: any = [];
    skinInfoData: any = [];
    rewardInfoData: any = [];
    EventRowId: string = "";
    EventID: string = "";
    public modalClose: string;
    //private sub: any;
    constructor(
        //private route: ActivatedRoute,
        private modalService: NgbModal,
        private _script: ScriptLoaderService,
        private eventListsService: EventListsService
    ) {
    }

    ngOnInit(): void {
        //this.getTableList();
        this.getGameItemInfo();
    }

    ngAfterViewInit() {
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/select2.js']);
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/base/sweetalert2.js']);
    }

    getGameItemInfo() {
        let res: any = [];
        this.eventListsService.getGameInfoData()
            .subscribe(
            gameInfoData => {
                res = gameInfoData;
                console.log(' this.gameInfoData', res)
                if (res.result == 100) {
                    this.gameInfoData = res.data[0].ITEM_CODE_LIST;
                    this.skinInfoData = res.data[0].SKIN_CODE_LIST;
                    this.rewardInfoData=res.data[0].REWARD_CODE_LIST;
                    this.getEventListsData()
                } else {
                    swal("It can't find table data", "Result Number is " + res.result.value, "error");
                }
            },
            error => this.errMessage = <any>error);
    }

    getEventListsData() {
        let res: any = [];
        this.eventListsService.getEventListsData()
            .subscribe(
            eventData => {
                res = eventData;
                console.log(' this.eventData', res)
                if (res.result == 100) {
                    //console.log(this.gameInfoData[0].ITEM_CODE_LIST)
                    this.eventData = res.data[0].result;
                    for (let i in this.eventData) {
                        for (let a in this.gameInfoData[0].ITEM_CODE_LIST) {
                            if (this.eventData[i].code.value == this.gameInfoData[0].ITEM_CODE_LIST[a].Value) {
                                //console.log('xxx', this.gameInfoData[0].ITEM_CODE_LIST[a].DescName);
                                this.eventData[i].descName = this.gameInfoData[0].ITEM_CODE_LIST[a].DescName;
                            }
                        }
                        if (this.eventData[i].type == 1) {
                            this.eventData[i].postTypeName = 'REWARD';
                        } else if (this.eventData[i].type == 2) {
                            this.eventData[i].postTypeName = 'ITEM';
                        } else {
                            this.eventData[i].postTypeName = '';
                        }

                        if (this.eventData[i].eventType.value == '1') {
                            this.eventData[i].userTypeName = '신규 유저';
                        } else if (this.eventData[i].eventType.value == '2') {
                            this.eventData[i].userTypeName = '기존 유저';
                        } else if (this.eventData[i].eventType.value == '0') {
                            this.eventData[i].userTypeName = 'ALL';
                            this.eventData[i].standardDate = 'None';
                        } else {
                            this.eventData[i].userTypeName = '';

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

    setEventListRemove(rowid, id) {
        let res: any = [];
        console.log('setInvenRemoveItem', id.value);
        this.eventListsService.setEventListRemove(id.value)
            .subscribe(
            eventListRemoveData => {
                res = eventListRemoveData;
                this.eventListRemoveData = res.data;
                console.log(' this.invenRemoveItem', res);
                if (res.result == 100) {
                    this.eventData.splice(rowid, 1);
                    swal("성공", rowid + "행 아이템 삭제 되었습니다.", "success");
                } else {
                    swal("Error", "Row No: " + rowid + " Result Number is " + res.result, "error");
                }
            },
            error => {
                this.errMessage = <any>error;
            });
    }
    setEventListAdd(userType, userDate, title, itemCode, count, msg, type, start, end) {
        let res: any = [];
        console.log(userType, userDate, title, itemCode, count, msg, type, start,end)
        this.eventListsService.setEventListAdd(userType, userDate, title, itemCode, count, msg, type, start, end)
            .subscribe(
            eventListAddData => {
                res = eventListAddData;
                this.eventListAddData = res.data;
                console.log(' this.eventListsAddData', res)
                if (res.result == 100) {
                    this.getEventListsData();
                    swal("성공", "이벤트 정보 추가 되었습니다.", "success");
                } else if (res.result == 3) {
                    swal("Error", "이벤트 시작 날짜가 현재시간 보다 빠릅니다.", "error");
                } else {
                    swal("Error", "Result Number is " + res.result, "error");
                }
            },
            error => {
                this.errMessage = <any>error;
            });
    }


    eventDeleteOpen(content, id, eid) {
        this.EventRowId = id;
        this.EventID = eid
        this.modalService.open(content).result.then((result) => {

            this.modalClose = `Closed with: ${result}`;
        }, (reason) => {
            this.modalClose = `Dismissed ${this.modalDismissReason(reason)}`;
        });
    }
    eventAddOpen(content) {
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
