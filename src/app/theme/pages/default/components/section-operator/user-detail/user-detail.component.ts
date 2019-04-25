import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalDismissReasons, NgbDateStruct, NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDetailService} from './user-detail.service';
import {ScriptLoaderService} from '../../../../../../_services/script-loader.service';
import {Helpers} from "../../../../../../helpers";
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

    @Input('ngModel') model:any;
    errTitle: string = "";
    errMessage: string = "";
    findData: any = [];
    invenData: any = [];
    clanData: any = [];
    clanMember: any = [];
    blockData: any = [];
    userGradeData: any = [];
    blockPlayerID: string = '';
    blockID: string = '';
    blockSecond: string = '';
    blockReason: string = '';
    id: string = "0";
    postData: any = [];
    nickName: string = '';

    public gameInfoData: any = []
    public tableData: any = [];
    public modalClose: string;
    public chgGoldData: string;
    public chgGemData: string;
    public invenModifyData: string;
    public InvenRowId: number = 0;

    public sendMailData: any = [];
    public invenRemoveItem: any = [];
    public removePostData: any = [];
    public userIdData: any = [];
    public countDay:any = '';
    public countHour:any = '';
    public countMin:any = '';
    public countSec:any = '';

    public nowGrade:number = 0;

    public friendListData: any = [];
    public clanListData: any = [];
    public clanListMemberData: any = [];
    public googleBillingData: any = [];
    public appleBillingData: any = [];
    public friendTab:boolean=false;
    public billingTab:boolean=false;
    public intervalID:any='';
    private selectedLink: string="nickname";
    public isFriendTab:boolean=true;
    public isClanTab:boolean=false;
    public isGoogleTab:boolean=true;
    public isAppleTab:boolean=false;

    public refundGoogleId: number=0;
    //private sub: any;
    constructor(
        //private route: ActivatedRoute,
        private modalService: NgbModal,
        private _script: ScriptLoaderService,
        private userDetailService: UserDetailService
    ) {
    }

    ngOnInit(): void {
        this.getTableList();
        this.getGameItemInfo();

        let hasName = sessionStorage.getItem("nickName");
        let hasId = sessionStorage.getItem("playerID");

        if(this.selectedLink=='nickname'){
            if (hasName != '' || hasName != null) {
                this.getParamData(hasName);
            }
        }else{
            if (hasId != '' || hasId != null){
                this.getPlayerIdData(hasId);
            }
        }
    }

    ngAfterViewInit() {
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/select2.js']);
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/base/sweetalert2.js']);
    }

    setradio(e: string): void
    {
        this.selectedLink = e;
    }

    isSelected(name: string): boolean
    {
        if (!this.selectedLink) {
            return false;
        }
        return (this.selectedLink === name);
    }
    setClickSocialTab(id:number):void{
        if(id==0){
            this.isFriendTab=true;
            this.isClanTab=false;
        }else{
            this.isFriendTab=false;
            this.isClanTab=true;
        }
    }

    setClickBuyTab(id:number):void{
        if(id==0){
            this.isGoogleTab=true;
            this.isAppleTab=false;
        }else{
            this.isGoogleTab=false;
            this.isAppleTab=true;
        }
    }

    getTableList(): void {
        let res: any = [];
        this.userDetailService.getTableData()
            .subscribe(
                tableData => {
                    res = tableData;
                    console.log(' this.tableData', res)
                    if (res.result.value == 100) {
                        this.tableData = res.data;
                    } else {
                        swal("It can't find table data", "Result Number is " + res.result.value, "error");
                    }
                },
                error => this.errMessage = <any>error);
    }

    getGameItemInfo() {
        let res: any = [];
        this.userDetailService.getGameInfoData()
            .subscribe(
                gameInfoData => {
                    res = gameInfoData;
                    console.log(' this.gameInfoData', res)
                    if (res.result.value == 100) {
                        this.gameInfoData = res.data;
                    } else {
                        swal("It can't find table data", "Result Number is " + res.result.value, "error");
                    }
                },
                error => this.errMessage = <any>error);
    }

    getParamData(id: string) {
        let res: any = [];

        if (!id) {
            return;
        }

        this.nickName='';
        this.userDetailService.getParamData(id)
            .subscribe(
                findData => {
                    res = findData;
                    console.log(' this.findData', res)
                    console.log('param', id);

                    if (res.result.value == 100) {
                        if(res.data.length >= 1){
                            this.getResultOk(res)
                        }else{
                            sessionStorage.removeItem('nickName');
                            swal("It can't find data", "데이타가 존재하지 않습니다.", "error");
                        }
                    } else {
                        sessionStorage.removeItem('nickName');
                        this.getResultError(res);
                    }
                },
                error => this.errMessage = <any>error);
    }

    getPlayerIdData(id: string) {
        let res: any = [];
        let type: number = 0;
        if (!id) {
            return;
        }

        for (let i in this.tableData) {
            if (this.tableData[i].DataName == "PlayerAccount") {
                type = +this.tableData[i].Type;
                //console.log(type);
            }
        }
        this.blockPlayerID='';
        this.userDetailService.getInventoryData(type, id)
            .subscribe(
                playerIdData => {
                    res = playerIdData;
                    if (res.result.value == 100) {
                        if(res.data.length >= 1){
                            this.getResultOk(res)
                        }else{
                            this.getResultError(res)
                        }
                    } else {
                        this.getResultError(res)
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }

    getResultOk(res){
        this.findData = res.data;
        this.blockPlayerID = this.findData[0].playerID.value;
        this.nickName = this.findData[0].nickname;
        let clanID = this.findData[0].clanID.value;

        sessionStorage.setItem('nickName', this.nickName);
        sessionStorage.setItem('playerID', this.blockPlayerID);

        setTimeout(() => {
            this.getInventoryData(this.blockPlayerID);
            this.getPostItemData(this.blockPlayerID);
            this.getFriendListData(this.blockPlayerID);
            this.getClanListData(clanID);
            this.getGoogleBillingData(this.blockPlayerID);
            this.getAppleBillingData(this.blockPlayerID);
            let grd = this.findData[0].accountGrade.value;

            let countryCode = this.gameInfoData[0].COUNTRY_CODE_LIST;
            let regionCode = this.gameInfoData[0].REGION_CODE_LIST;

            this.nowGrade=grd;
            if (grd == 0) {
                this.findData[0].gradeDescName = '영구블럭'
            } else if (grd == 1) {
                this.findData[0].gradeDescName = '일반'
            } else if (grd == 2) {
                this.findData[0].gradeDescName = '내부 관계자'
            } else {
                this.findData[0].gradeDescName = '오류'
            }

            for (let a in countryCode) {
                if (this.findData[0].countryCode.value == countryCode[a].Value.value) {
                    console.log(countryCode[a].DescName);
                    this.findData[0].countryDescName = countryCode[a].DescName;
                }
            }

            for (let b in regionCode) {
                if (this.findData[0].regionCode.value == regionCode[b].Value.value) {
                    console.log(regionCode[b].DescName);
                    this.findData[0].regionDescName = regionCode[b].DescName;
                }
            }

            if (this.findData[0].blockTime !== '') {
                this.setCountDown(this.findData[0].blockTime);
            }

        }, 1000);
    }

    getResultError(res){
        this.findData = [];
        this.blockPlayerID = '';
        this.nickName = '';
        sessionStorage.removeItem('nickName');
        sessionStorage.removeItem('playerID');
        swal("It can't find data", "Result Number is " + res.result, "error");
    }

    setCountDown(date) {
        const second = 1000,minute = second * 60,hour = minute * 60,day = hour * 24;
        let countDown = new Date(date).getTime()
        let now = new Date().getTime()
        let distance = countDown - now;

        clearInterval(this.intervalID);
        $('#time').text('');

        if (distance < 0) {
            clearInterval(this.intervalID);
            $('#time').text('');
        }else{
            this.intervalID=setInterval(function () {
                let countDown = new Date(date).getTime()
                let now = new Date().getTime()
                let countDay,countHour,countMin,countSec;
                let distance = countDown - now;
                countDay = Math.floor(distance / (day));
                countHour = Math.floor((distance % (day)) / (hour));
                countMin = Math.floor((distance % (hour)) / (minute));
                countSec = Math.floor((distance % (minute)) / second);
                $('#time').text("  Time Left: "+countDay+"d  "+countHour+":"+countMin+":"+countSec);
            }, second)
        }
    }

    getUserIdData(id: string, content) {
        let res: any = [];
        if (!id) {
            return;
        }
        let type: number = 0;
        for (let i in this.tableData) {
            if (this.tableData[i].DataName == "VendorAccount") {
                type = +this.tableData[i].Type;
                //console.log(type);
            }
        }
        this.userDetailService.getInventoryData(type, id)
            .subscribe(
                userIdData => {
                    res = userIdData;
                    console.log(' this.userIdData', res)
                    if (res.result.value == "100") {
                        this.userIdData = res.data[0];
                        /*
                       let countyCode = this.gameInfoData[0].COUNTRY_CODE_LIST;
                       let regionCode = this.gameInfoData[0].REGION_CODE_LIST;

                       for (let i in countyCode) {
                           if (this.userIdData.countryCode.value == countyCode[i].Value.value) {
                               console.log(countyCode[i].DescName);
                               this.userIdData.countryName = countyCode[i].DescName;
                           }
                       }
                       for (let i in regionCode) {
                           if (this.userIdData.regionCode.value == regionCode[i].Value.value) {
                               console.log(regionCode[i].DescName);
                               this.userIdData.regionName = regionCode[i].DescName;
                           }
                       }
                       */
                        this.setEditOpen(content);

                    } else {
                        swal("It can't find data", "Result Number is " + res.result.value, "error");

                    }
                },
                error => {
                    this.errMessage = <any>error;

                });
    }

    getInventoryData(id: string) {
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
                    this.invenData = res.data;
                    console.log(' this.invenData', res)
                    if (res.result == 100) {
                        //console.log(this.gameInfoData[0].ITEM_CODE_LIST)
                        for (let i in this.invenData) {
                            for (let a in this.gameInfoData[0].ITEM_CODE_LIST) {
                                if (this.invenData[i].itemCode.value == this.gameInfoData[0].ITEM_CODE_LIST[a].Value.value) {
                                    console.log('xxx',this.gameInfoData[0].ITEM_CODE_LIST[a].DescName);
                                    this.invenData[i].descName = this.gameInfoData[0].ITEM_CODE_LIST[a].DescName;
                                }
                            }
                        }
                    } else {
                        swal("It can't find " + type + " data", "Result Number is " + res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }

    setInvenRemoveItem(rowid, id, itemCode) {
        let res: any = [];
        console.log('setInvenRemoveItem', id, itemCode);
        this.userDetailService.setInvenRemoveItem(id, itemCode)
            .subscribe(
                invenRemoveItem => {
                    res = invenRemoveItem;
                    this.invenRemoveItem = res.data;
                    console.log(' this.invenRemoveItem', res);
                    if (res.result == 100) {
                        this.invenData.splice(rowid, 1);
                        swal("성공", rowid + ": 아이템 삭제 되었습니다.", "success");
                    } else {
                        swal("Error", "Row No: " + rowid + " Result Number is " + res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }

    setInvenItem(rowid, id, itemCode, count, level, expriy, skinCode) {
        let res: any = [];
        console.log('setInvenItem', id, itemCode, count, level, expriy, skinCode);
        this.userDetailService.setInvenItem(id, itemCode, count, level, expriy, skinCode)
            .subscribe(
                invenModifyData => {
                    res = invenModifyData;
                    this.invenModifyData = res.data;
                    console.log(' this.invenModifyData', res)
                    if (res.result.value == 100) {
                        swal("성공", "플레이어 아이디: " + id + ' 행번호:' + rowid + " 아이템 정보가 수정 되었습니다.", "success");
                        this.invenData[rowid].exp = res.data[0].exp;
                        this.invenData[rowid].level = res.data[0].level;
                        this.invenData[rowid].skinCode = res.data[0].skinCode;
                        this.invenData[rowid].expriy = res.data[0].expriy;
                        //$('#sty-gem').css({"color":"blue", "font-weight":"bold"})
                        //$('#sty-bGem').css({"color":"blue", "font-weight":"bold"})
                    } else {
                        swal("Error", "Result Number is " + res.result.value, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }

    getPostItemData(id: string) {
        let res: any = [];
        let type: number = 0;
        for (let i in this.tableData) {
            if (this.tableData[i].DataName == "PostData") {
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
                    if (res.result.value == '100') {
                        this.postData = res.data;
                    } else {
                        swal("It can't find " + type + " data", "Result Number is " + res.result.value, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }

    removePostItemData(rowid, playerid: string, postid: string) {
        let res: any = [];
        //팝업창을 띄우고 콜
        this.userDetailService.removePostItemData(playerid, postid)
            .subscribe(
                removePostData => {
                    res = removePostData;
                    console.log(' this.removePostData', res)
                    if (res.result == 100) {
                        this.removePostData = res.data;
                        this.postData.splice(rowid, 1);
                        swal("성공", postid + ": 우편이 삭제 되었습니다.", "success");
                    } else {
                        swal("It can't find " + postid + " data", "Result Number is " + res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }

    setSendItemMail(id, itemCode, count, sender, message) {
        let res: any = [];
        //팝업창을 띄우고 콜
        this.userDetailService.setSendItemMail(id, itemCode, count, sender, message)
            .subscribe(
                sendMailData => {
                    res = sendMailData;
                    console.log(' this.sendMailData', res)
                    if (res.result == 100) {
                        swal("우편 발송 완료", res.data[0].state, "success");
                        this.sendMailData = res.data;
                        this.getPostItemData(id);
                    } else {
                        swal("It can't find data", "Result Number is " + res.result.value, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }

    setUserBlock(id: string, sec: string, txt: string) {
        let res: any = [];
        //console.log('setUserBlock', id, sec, txt);
        this.userDetailService.setUserBlock(id, sec, txt)
            .subscribe(
                blockData => {
                    res = blockData;
                    this.blockData = res.data;
                    console.log(' this.blockData', res)
                    if (res.result.value == 100) {
                        swal(id + " has been block", "Time to " + res.data[0].BlockTime, "success");
                        this.findData[0].blockTime = res.data[0].BlockTime;
                        $('#sty-panelty-time').css({"color": "blue", "font-weight": "bold"})
                    } else {
                        swal("It can't find data", "Result Number is " + res.result.value, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });

    }

    setChangeUserGrade(id: string, grade: string) {
        let res: any = [];
        //console.log('setUserGrade', id, grade);
        this.userDetailService.setChangeUserGrade(id, grade)
            .subscribe(
                userGradeData => {
                    res = userGradeData;
                    this.userGradeData = res.data;
                    //console.log(' this.userGradeData', res)
                    if (res.result.value == 100) {
                        let grd = res.data[0].newGrade.value;
                        if (grd == 0) {
                            this.findData[0].gradeDescName = '영구블럭'
                        } else if (grd == 1) {
                            this.findData[0].gradeDescName = '일반'
                        } else if (grd == 2) {
                            this.findData[0].gradeDescName = '내부 관계자'
                        } else {
                            this.findData[0].gradeDescName = '오류'
                        }

                        $('#sty-grade').css({"color": "blue", "font-weight": "bold"})
                        swal(id + "님 유저 등급이 변경 되었습니다.", "새로운 등급: " + res.data[0].newGrade, "success");
                    } else {
                        swal("It can't find data", "Result Number is " + res.result.value, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });

    }

    setChangeGold(id: string, param: string) {
        let res: any = [];
        console.log('setGoldChange', param);
        this.userDetailService.setChangeGold(id, param)
            .subscribe(
                chgGoldData => {
                    res = chgGoldData;
                    this.chgGoldData = res.data;
                    console.log(' this.chgGoldData', res)
                    if (res.result.value == 100) {
                        swal("수정 되었습니다.", "보유중인 골드" + this.findData[0].gold + "에서 " + res.data[0].gold + "로 변경 되었습니다.", "success");
                        this.findData[0].gold = res.data[0].gold;
                        $('#sty-gold').css({"color": "blue", "font-weight": "bold"})
                    } else {
                        swal("It can't find data", "Result Number is " + res.result.value, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });

    }

    setChangeGem(id: string, param1: string, param2: string) {
        let res: any = [];
        console.log('setGemChange', param1, param2);
        this.userDetailService.setChangeGem(id, param1, param2)
            .subscribe(
                chgGemData => {
                    res = chgGemData;
                    this.chgGemData = res.data;
                    console.log(' this.chgGemData', res)
                    if (res.result.value == 100) {
                        swal("수정 되었습니다.", "보유중인 GEM은 " + this.findData[0].gem + "에서 " + res.data[0].gem + "로 변경 되었습니다. <br>" + "보유중인 보너스 GEM은 " + this.findData[0].bonusGem + "에서 " + res.data[0].bonusGem + "로 변경 되었습니다. \n", "success");
                        this.findData[0].gem = res.data[0].gem;
                        this.findData[0].bonusGem = res.data[0].bonusGem;
                        $('#sty-gem').css({"color": "blue", "font-weight": "bold"})
                        $('#sty-bGem').css({"color": "blue", "font-weight": "bold"})
                    } else {
                        swal("Error", "Result Number is " + res.result.value, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });

    }

    sendMailEditOpen(content) {
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

    itemEditOpen(content, id) {
        this.InvenRowId = id;
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker', ['assets/demo/default/custom/components/forms/widgets/bootstrap-datetimepicker.js']);

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

    setRefundEditOpen(content,id) {
        this.refundGoogleId=id;
        this.modalService.open(content).result.then((result) => {
            this.modalClose = `Closed with: ${result}`;
        }, (reason) => {
            this.modalClose = `Dismissed ${this.modalDismissReason(reason)}`;
        });
    }

    getFriendListData(id: string) {
        let res: any = [];
        if (!id) {
            return;
        }
        let type: number = 0;
        for (let i in this.tableData) {
            if (this.tableData[i].DataName === "Friend") {
                type = +this.tableData[i].Type;
                console.log(type);
            }
        }
        this.userDetailService.getFriendListData(type,id)
            .subscribe(
                friendListData => {
                    res = friendListData;
                    console.log(' this.friendListData', res)
                    if (res.result.value == 100) {
                        if(res.data.length > 0){
                            this.friendListData = res.data;
                        }else{
                            this.friendListData = [];
                        }
                    } else {
                        swal("It can't find data", "Result Number is " + res.result.value, "error");

                    }
                },
                error => {
                    this.errMessage = <any>error;

                });
    }
    getClanListData(id: string) {
        let res: any = [];
        if (!id) {
            return;
        }
        let type: string = '';
        for (let i in this.tableData) {
            if (this.tableData[i].DataName === "Clan") {
                type = this.tableData[i].Type;
                console.log("Clan",type);
            }
        }
        this.userDetailService.getClanListData(type,id)
            .subscribe(
                friendListData => {
                    res = friendListData;
                    console.log(' this.clanListData', res)
                    if (res.result.value == 100) {
                        if(res.data.length > 0){
                            this.clanListData = res.data;
                            let countryCode = this.gameInfoData[0].COUNTRY_CODE_LIST;
                            for (let a in countryCode) {
                                if (this.clanListData[0].countryCode === countryCode[a].Value) {
                                    console.log(countryCode[a].DescName);
                                    this.clanListData[0].countryDescName = countryCode[a].DescName;
                                }
                            }
                            this.getClanMemberListData(id);
                        }else{
                            this.clanListData = [];
                        }
                    } else {
                        swal("It can't find data", "Result Number is " + res.result.value, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;

                });
    }
    getClanMemberListData(id: string) {
        let res: any = [];
        if (!id) {
            return;
        }
        let type: number = 0;
        for (let i in this.tableData) {
            if (this.tableData[i].DataName === "ClanMember") {
                type = +this.tableData[i].Type;
                console.log(type);
            }
        }
        this.userDetailService.getClanListData(type, id)
            .subscribe(
                friendListData => {
                    res = friendListData;
                    console.log(' this.clanListMemberData', res)
                    if (res.result.value == 100) {
                        if(res.data.length > 0){
                            this.clanListMemberData = res.data;
                            let clanID = this.clanListData[0].clanID.value;
                            let clanName = this.clanListData[0].name;

                            for (let a in this.clanListMemberData) {
                                if (this.clanListMemberData[a].clanID.value == clanID) {
                                    this.clanListMemberData[a].clanName = clanName;
                                }
                            }
                        }else{
                            this.clanListMemberData = [];
                        }
                    } else {
                        swal("It can't find data", "Result Number is " + res.result.value, "error");

                    }
                },
                error => {
                    this.errMessage = <any>error;

                });
    }
    getGoogleBillingData(id: string) {
        let res: any = [];
        if (!id) {
            return;
        }
        let type: number = 0;
        for (let i in this.tableData) {
            if (this.tableData[i].DataName === "GoogleBilling") {
                type = +this.tableData[i].Type;
                console.log(type);
            }
        }
        this.userDetailService.getGoogleBillingData(type,id)
            .subscribe(
                googleBillingData => {
                    res = googleBillingData;
                    console.log(' this.googleBillingData', res)
                    console.log(' this.googleBillingData', res.data.length)
                    if (res.result.value == 100) {
                        if(res.data.length > 0){
                            this.googleBillingData = res.data;
                            let shopCodeListData=this.gameInfoData[0].SHOP_CODE_LIST
                            for (let i in this.googleBillingData) {
                                for (let a in shopCodeListData) {
                                    if (this.googleBillingData[i].shopCode.value == shopCodeListData[a].Value.value) {
                                        this.googleBillingData[i].shopDescName = shopCodeListData[a].DescName;
                                    }
                                }
                            }
                        }else{
                            this.googleBillingData = [];
                        }
                    } else {
                        swal("It can't find data", "Result is " + res.result.value, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;

                });
    }
    refundGoogleBilling(playerid, purchaseid) {
        let res: any = [];
        //팝업창을 띄우고 콜
        this.userDetailService.refundGoogleBilling(playerid, purchaseid)
            .subscribe(
                refundGoogleBilling => {
                    res = refundGoogleBilling;
                    console.log(' this.refundGoogleBilling', res);
                    if (res.result.value == 100) {
                        this.refundGoogleBilling = res.data;
                        swal("성공", purchaseid + ": 이(가) 환불이 완료 되었습니다.", "success");
                        this.getGoogleBillingData(playerid);
                    } else {
                        let valueMsg='에러';
                        if(res.result.value=='0'){
                            valueMsg='권한이 없습니다.';
                        }else if(res.result.value=='1'){
                            valueMsg='파라미터 에러';
                        }else if(res.result.value=='2'){
                            valueMsg='데이터가 존재하지 않습니다.';
                        }else if(res.result.value=='3'){
                            valueMsg='구매 완료 상태가 아닙니다.';
                        }else if(res.result.value=='4'){
                            valueMsg='이미 환불 되었습니다.';
                        }else if(res.result.value=='5'){
                            valueMsg='회수할 잼이 부족합니다.';
                        }
                        swal("It can't find ID:" + purchaseid, "Result is " + valueMsg, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error;
                });
    }
    getAppleBillingData(id: string) {
        let res: any = [];
        if (!id) {
            return;
        }
        let type: number = 0;
        for (let i in this.tableData) {
            if (this.tableData[i].DataName == "AppleBilling") {
                type = +this.tableData[i].Type;
                console.log(type);
            }
        }
        this.userDetailService.getAppleBillingData(type,id)
            .subscribe(
                appleBillingData => {
                    res = appleBillingData;

                    if (res.result.value == 100) {
                        if(res.data.length > 0){
                            this.appleBillingData = res.data;
                            console.log(' this.appleBillingData', res.data)
                        }else{
                            this.appleBillingData = [];
                        }
                    } else {
                        swal("It can't find data", "Result Number is " + res.result.value, "error");

                    }
                },
                error => {
                    this.errMessage = <any>error;

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
