import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalDismissReasons,NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { UserDetailService } from './user-detail.service';
import { ScriptLoaderService } from '../../../../../../_services/script-loader.service';
import { Helpers } from "../../../../../../helpers";
import 'rxjs/add/operator/switchMap';
import * as $ from 'jquery';
declare var swal: any;

@Component({
    selector: "app-widgets-bootstrap-datetimepicker",
    templateUrl: "./user-detail.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [UserDetailService]
})
export class UserDetailComponent implements OnInit, AfterViewInit {

    @Input()
    errTitle: string = "";
    errMessage: string = "";
    findData: any = [];
    invenData: any = [];
    tableData: any = [];
    clanData: any=[];
    clanMember:any=[];
    blockData:any=[];
    userGradeData:any=[];
    blockPlayerID:string='';
    blockID:string='';
    blockSecond:string='';
    blockReason:string='';

    id: string = "0";
    postData:any=[];

    public modalClose: string;
    public chgGoldData: string;
    public chgGemData: string;
    public invenModifyData: string;
    public InvenRowId:number=0;
    public gameInfoData:any=[];
    public sendMailData:any=[];
    //private sub: any;
    constructor(
        //private route: ActivatedRoute,
        private modalService:NgbModal,
        private _script: ScriptLoaderService,
        private userDetailService: UserDetailService,
    ) { }

    ngOnInit(): void {
        this.getTableList();
        this.getGameItemInfo();
    }
    ngAfterViewInit() {
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/select2.js']);
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/base/sweetalert2.js']);
    }
    getTableList(): void {
        let res: any = [];
        this.userDetailService.getTableData()
            .subscribe(
            tableData => {
                res = tableData;
                console.log(' this.tableData', res)
                if (res.result === 100) {
                    this.tableData = res.data;
                }else{
                    swal("It can't find table data", "Result Number is "+res.result, "error");
                }
            },
            error => this.errMessage = <any>error);
    }
    getGameItemInfo(){
        let res: any = [];
        this.userDetailService.getGameInfoData()
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

    getParamData(id: string) {
        let res: any = [];
        if (!id) { return; }
        this.userDetailService.getParamData(id)
            .subscribe(
            findData => {
                res = findData;
                console.log(' this.findData', res)
                if (res.result === 100) {
                    this.findData = res.data;
                    this.blockPlayerID=this.findData[0].playerID;
                    setTimeout(() => {
                        this.getInventoryData(this.findData[0].playerID);
                        this.getPostItemData(this.findData[0].playerID);
                    }, 500);
                } else {
                    console.log(' this.findData', res)
                    swal("It can't find data", "Result Number is "+res.result, "error");
                }
            },
            error => this.errMessage = <any>error);
    }

    getInventoryData(id: number) {
        let res: any = [];
        let type: number = 0;
        for (let i in this.tableData) {
            if (this.tableData[i].DataName === "Inventory") {
                type = +this.tableData[i].Type;
                console.log(type);
            }
        }
        this.userDetailService.getInventoryData(type, id)
            .subscribe(
            invenData => {
                res = invenData;
                this.invenData  = res.data;
                console.log(' this.invenData', res)
                if (res.result === 100) {
                    console.log(this.gameInfoData[0].ITEM_CODE_LIST[0])
                    for (let i in this.invenData) {
                        for (let a in this.gameInfoData[0].ITEM_CODE_LIST) {
                            if ( Number(this.invenData[i].itemCode) === this.gameInfoData[0].ITEM_CODE_LIST[a].Value ) {
                                console.log(this.gameInfoData[0].ITEM_CODE_LIST[a].DescName);
                                this.invenData[i].descName=this.gameInfoData[0].ITEM_CODE_LIST[a].DescName;
                            }
                        }
                    }
                } else {
                    swal("It can't find "+type+" data", "Result Number is "+res.result, "error");
                }
            },
            error => {
                this.errMessage = <any>error;
            });
    }

    getPostItemData(id: number) {
        let res: any = [];
        let type: number = 0;
        for (let i in this.tableData) {
            if (this.tableData[i].DataName === "PostData") {
                type = +this.tableData[i].Type;
                console.log(type);
            }
        }
        //팝업창을 띄우고 콜
        this.userDetailService.getPostItemData(type, id)
            .subscribe(
                postData => {
                    res = postData;
                    console.log(' this.postData', res)
                    if (res.result === 100) {
                        this.postData  = res.data;
                    } else {
                        swal("It can't find "+type+" data", "Result Number is "+res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }

    setSendItemMail(id, itemCode, count, sender, message){
        let res: any = [];
        //팝업창을 띄우고 콜
        this.userDetailService.setSendItemMail(id, itemCode, count, sender, message)
            .subscribe(
                sendMailData => {
                    res = sendMailData;
                    console.log(' this.sendMailData', res)
                    if (res.result === 100) {
                        swal("우편 발송 완료", res.data[0].state, "success");
                        this.sendMailData  = res.data;
                    } else {
                        swal("It can't find data", "Result Number is "+res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }

    setUserBlock(id:string,sec:string,txt:string){
        let res: any = [];
        console.log('setUserBlock', id, sec, txt);
        this.userDetailService.setUserBlock(id, sec, txt)
            .subscribe(
                blockData => {
                    res = blockData;
                    this.blockData  = res.data;
                    console.log(' this.blockData', res)
                    if (res.result === 100) {
                        swal(id+" has been block", "Time to "+res.data[0].BlockTime, "success");
                    } else {
                        swal("It can't find data", "Result Number is "+res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });

    }

    setChangeUserGrade(id:string, grade:string){
        let res: any = [];
        console.log('setUserGrade', id, grade);
        this.userDetailService.setChangeUserGrade(id, grade)
            .subscribe(
                userGradeData => {
                    res = userGradeData;
                    this.userGradeData  = res.data;
                    console.log(' this.userGradeData', res)
                    if (res.result === 100) {
                        swal(id+"님 유저 등급이 변경 되었습니다.", "새로운 등급: "+ res.data[0].newGrade, "success");
                    } else {
                        swal("It can't find data", "Result Number is "+res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });

    }
    setChangeGold(id:string, param:string){
        let res: any = [];
        console.log('setGoldChange', param);
        this.userDetailService.setChangeGold(id, param)
            .subscribe(
                chgGoldData => {
                    res = chgGoldData;
                    this.chgGoldData  = res.data;
                    console.log(' this.chgGoldData', res)
                    if (res.result === 100) {
                        swal("수정 되었습니다.","보유중인 골드"+this.findData[0].gold+"에서 "+res.data[0]+"로 변경 되었습니다.", "success");
                        this.findData[0].gold=res.data[0];
                        $('#sty-gold').css({"color":"blue", "font-weight":"bold"})
                    } else {
                        swal("It can't find data", "Result Number is "+res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });

    }
    setChangeGem(id:string, param1:string, param2:string){
        let res: any = [];
        console.log('setGemChange', param1, param2);
        this.userDetailService.setChangeGem(id, param1, param2)
            .subscribe(
                chgGemData => {
                    res = chgGemData;
                    this.chgGemData  = res.data;
                    console.log(' this.chgGemData', res)
                    if (res.result === 100) {
                        swal("수정 되었습니다.","보유중인 GEM은 "+this.findData[0].gem+"에서 "+res.data[0]+"로 변경 되었습니다. <br>"+"보유중인 보너스 GEM은 "+this.findData[0].bonusGem +"에서 "+res.data[1]+"로 변경 되었습니다. \n", "success");
                        this.findData[0].gem=res.data[0];
                        this.findData[0].bonusGem=res.data[1];
                        $('#sty-gem').css({"color":"blue", "font-weight":"bold"})
                        $('#sty-bGem').css({"color":"blue", "font-weight":"bold"})
                    } else {
                        swal("Error", "Result Number is "+res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });

    }
    setInvenItem(rowid, id, itemCode, count, level, expriy, skinCode){
        let res: any = [];
        console.log('setInvenItem', id,itemCode,count,level,expriy,skinCode);
        this.userDetailService.setInvenItem(id,itemCode,count,level,expriy,skinCode)
            .subscribe(
                invenModifyData => {
                    res = invenModifyData;
                    this.invenModifyData  = res.data;
                    console.log(' this.invenModifyData', res)
                    if (res.result === 100) {
                        swal("성공", "플레이어 아이디: "+id+' 행번호:'+rowid+" 아이템 정보가 수정 되었습니다.", "success");
                        this.invenData[rowid].exp=res.data[0].exp;
                        this.invenData[rowid].level=res.data[0].level;
                        this.invenData[rowid].skinCode=res.data[0].skinCode;
                        this.invenData[rowid].expriy=res.data[0].expriy;
                        //$('#sty-gem').css({"color":"blue", "font-weight":"bold"})
                        //$('#sty-bGem').css({"color":"blue", "font-weight":"bold"})
                    } else {
                        swal("Error", "Result Number is "+res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }
    sendMailEditOpen(content) {
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/bootstrap-datetimepicker.js']);

        this.modalService.open(content).result.then((result) => {
            this.modalClose = `Closed with: ${result}`;
        }, (reason) => {
            this.modalClose = `Dismissed ${this.modalDismissReason(reason)}`;
        });
    }

    itemEditOpen(content,id) {
        this.InvenRowId=id;
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/bootstrap-datetimepicker.js']);

        this.modalService.open(content).result.then((result) => {

            this.modalClose = `Closed with: ${result}`;
        }, (reason) => {
            this.modalClose = `Dismissed ${this.modalDismissReason(reason)}`;
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
    getClanData(clanID:number){


    }
    getClanMember(clanID:number){

    }
    /*
    getAlretClick(){
        var self = this;
        //== Sweetalert Demo 3
        $('#m_sweetalert_demo_3_1').click(function(e) {

        });

        $('#m_sweetalert_demo_3_2').click(function(e) {
            swal("Good job!", "You clicked the button!", "error");
        });

        $('#m_sweetalert_demo_3_3').click(function(e) {
            swal("Good job!", "You clicked the button!", "success");
        });

        $('#m_sweetalert_demo_3_4').click(function(e) {
            swal("Good job!", "You clicked the button!", "info");
        });

        $('#m_sweetalert_demo_3_5').click(function(e) {
            swal("Good job!", "You clicked the button!", "question");
        });
    }*/
}

export interface IAlert {
    id: number;
    type: string;
    message: string;
}