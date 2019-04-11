import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ServerManageService} from "./server-manage.service";
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
    public serverAllStopReturn: any = [];
    public serverAllUpdateReturn: any = [];

    public serverStartReturn: any = [];
    public serverStopReturn: any = [];
    public serverUpdateReturn: any = [];

    public allServerOnSet: boolean = true;
    public allServerArSet: boolean = true;
    public allServerUpArSet: boolean = true;
    public nowClickServerName: string = '';
    public serverOnSet: boolean = true;
    public serverArSet: boolean = false;


    constructor(private modalService: NgbModal, private serverManageService: ServerManageService) {
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
                        console.log('this serverStat', this.serverStatData)
                    } else {
                        swal("Error", "Result Number is " + res.result, "error");
                    }
                },
                error => this.errMessage = <any>error);
    }

    getCheckStatAllServer(serverBoo, arBoo) {
        console.log(serverBoo, arBoo);
        if (!serverBoo) {
            this.getServerAllStop(arBoo)
        } else if (serverBoo) {
            this.getServerAllStart(arBoo)
        }
    }

    getCheckStatServer(serverBoo, arBoo, sname) {
        console.log(serverBoo, arBoo, sname);
        if (!serverBoo) {
            this.getServerSpecStop(sname)
        } else if (serverBoo) {
            this.getServerSpecStart(sname, arBoo)
        }
    }

    getServerAllStart(boo) {
        let res: any = [];
        this.serverManageService.getServerAllStart(boo)
            .subscribe(
                serverAllStartReturn => {
                    res = serverAllStartReturn;
                    console.log('getServerAllStart', res);

                    if (res.result === 100) {
                        this.serverAllStartReturn = res.data[0].serverList;

                        this.allServerOnSet = true;
                        this.allServerArSet = boo;

                        let serverData = this.serverStatData[0];
                        let returnData = this.serverAllStartReturn;

                        for (let i in returnData) {
                            let setServerName=returnData[i]
                            for (let a in setServerName) {
                                if (setServerName[a].Result == 'success') {
                                    serverData[i][a].State='ACTIVE';
                                }
                            }
                        }
                        swal("Start All Server", "모든 서버가 구동중 입니다.", "success");
                        //리셋
                        this.getServerStateList();
                        console.log('this serverStat', this.serverAllStartReturn)
                    } else {
                        swal("Error", "Result Number is " + res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error
                });

    }

    getServerAllStop(boo) {
        let res: any = [];
        this.serverManageService.getServerAllStop()
            .subscribe(
                serverAllStopReturn => {
                    res = serverAllStopReturn;
                    if (res.result === 100) {
                        this.serverAllStopReturn = res.data[0].serverList;
                        this.allServerOnSet = false;
                        this.allServerArSet = boo;
                        let serverData = this.serverStatData[0];
                        let returnData = this.serverAllStopReturn;
                        for (let i in returnData) {
                            let setServerName=returnData[i]
                            for (let a in setServerName) {
                                if (setServerName[a].Result == 'success') {
                                    //serverData[i][a].Concurrent=false;
                                    serverData[i][a].State='INACTIVE';
                                }
                            }
                        }
                        swal("Stop All Server", "모든 서버가 중단 되었습니다.", "success");
                        //리셋
                        this.getServerStateList();
                        console.log('this serverStat', this.serverAllStopReturn)
                    } else {
                        swal("Error", "Result Number is " + res.result, "error");
                    }
                },
                error => this.errMessage = <any>error);
    }

    getServerAllUpdate(boo) {
        let res: any = [];
        this.serverManageService.getServerAllUpdate(boo)
            .subscribe(
                serverAllUpdateReturn => {
                    res = serverAllUpdateReturn;
                    if (res.result === 100) {
                        this.serverAllUpdateReturn = res.data[0].serverList;
                        this.allServerUpArSet = boo;
                        let serverData = this.serverStatData[0];
                        let returnData = this.serverAllUpdateReturn;
                        for (let i in returnData) {
                            let setServerName=returnData[i]
                            for (let a in setServerName) {
                                if (setServerName[a].Result == 'success') {
                                    //serverData[i][a].Concurrent=boo;
                                }
                            }
                        }
                        swal("Update All Server", "모든 업데이트 되었습니다.", "success");
                        //리셋
                        this.getServerStateList();

                        console.log('this serverStat', this.serverAllUpdateReturn)
                    } else {
                        swal("Error", "Result Number is " + res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error
                });
    }

    getServerSpecStart(sname, boo) {
        let res: any = [];
        this.serverManageService.getServerSpecStart(sname, boo)
            .subscribe(
                serverStartReturn => {
                    res = serverStartReturn;
                    console.log('getServerSpecStart', res);
                    if (res.result === 100) {
                        let serverData = this.serverStatData[0];
                        for (let i in serverData) {
                            console.log()
                            let serverName = serverData[i][0].ServerName;

                            if (sname == serverName) {
                                //serverData[i][0].Concurrent = boo;
                                serverData[i][0].State = 'ACTIVE';
                            }
                        }
                        console.log(this.serverStatData);

                        swal("Start " + sname + " Server", "서버가 켜졌습니다.", "success");
                        console.log('this.serverStartReturn ', this.serverStartReturn)
                    } else {
                        swal("Error", "Result Number is " + res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error
                });
    }

    getServerSpecStop(sname) {
        let res: any = [];
        this.serverManageService.getServerSpecStop(sname)
            .subscribe(
                serverStopReturn => {
                    res = serverStopReturn;
                    console.log('getServerSpecStop', res);
                    if (res.result === 100) {
                        let serverData = this.serverStatData[0];
                        for (let i in serverData) {
                            console.log()
                            let serverName = serverData[i][0].ServerName;
                            if (sname == serverName) {
                                //serverData[i][0].Concurrent = false;
                                serverData[i][0].State = 'INACTIVE';
                            }
                        }
                        console.log(this.serverStatData);
                        swal("Stop " + sname + " Server", "서버가 꺼졌습니다.", "success");
                        console.log('this.serverStopReturn ', this.serverStopReturn)
                    } else {
                        swal("Error", "Result Number is " + res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error
                });
    }


    getServerUpdate(sname, boo) {
        let res: any = [];
        this.serverManageService.getServerUpdate(sname, boo)
            .subscribe(
                serverUpdateReturn => {
                    res = serverUpdateReturn;
                    console.log('serverUpdateReturn', res);
                    if (res.result === 100) {
                        this.serverArSet = boo;
                        let serverData = this.serverStatData[0];
                        for (let i in serverData) {
                            let serverName = serverData[i][0].ServerName;
                            if (sname == serverName) {
                                //serverData[i][0].Concurrent = boo;
                            }
                        }
                        swal("Update " + sname + " Server", "서버 업데이트 되었습니다.", "success");
                        console.log(' this.serverUpdateReturn ', this.serverUpdateReturn)
                    } else {
                        swal("Error", "Result Number is " + res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error
                });
    }

    getAllKickUser(msg) {
        let res: any = [];
        this.serverManageService.getAllKickUser(msg)
            .subscribe(
                kickUserReturn => {
                    res = kickUserReturn;
                    console.log(res)
                    if (res.result === 100) {
                        swal("메시지 전송 완료", "유저에게 메시지 '"+msg+"' 보냈습니다.", "success");
                    } else {
                        swal("Error", "Result Number is " + res.result, "error");
                    }
                },
                error => {
                    this.errMessage = <any>error
                });
    }

    setEditOpen(content) {
        this.modalService.open(content).result.then((result) => {
            this.modalClose = `Closed with: ${result}`;
        }, (reason) => {
            this.modalClose = `Dismissed ${this.modalDismissReason(reason)}`;
        });
    }

    setSpecEditOpen(content, sname, setVal, arVal) {
        this.nowClickServerName = sname;
        let onSetVal;
        if (setVal == 'ACTIVE') {
            onSetVal = true;
        } else {
            onSetVal = false
        }
        this.serverOnSet = onSetVal;
        this.serverArSet = arVal;

        this.modalService.open(content).result.then((result) => {
            this.modalClose = `Closed with: ${result}`;
        }, (reason) => {
            this.modalClose = `Dismissed ${this.modalDismissReason(reason)}`;
        });
    }

    setUpdateEditOpen(content, sname, boo) {
        console.log(boo);
        this.nowClickServerName = sname;
        this.serverArSet = boo;
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
