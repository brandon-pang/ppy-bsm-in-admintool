import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbDateStruct, NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NoticeIngameService } from "./notice-ingame.service";
import { ScriptLoaderService } from '../../../../../../_services/script-loader.service';
import { Helpers } from "../../../../../../helpers";
import 'rxjs/add/operator/switchMap';
import * as $ from 'jquery';
import { isNgTemplate } from "@angular/compiler";
declare var swal: any;

@Component({
    selector: "app-widgets-bootstrap-datetimepicker",
    templateUrl: "./notice-ingame.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [NoticeIngameService]
})

export class NoticeIngameComponent implements OnInit {
    @Input()
    public getNoticeData: any = [];
    public errMessage: string;
    public modalClose: string;
    constructor(
        private noticeIngameService: NoticeIngameService,
        private modalService: NgbModal,
        private _script: ScriptLoaderService,
    ) { }
    ngOnInit(): void {

    }
    setNoticeData(value) {
        let vm = this;
        if (value.toString().length > 129) {
            swal("실패", "글자 수가 너무 많습니다.", "error");
            $('#noticetxt').val('');
            return
        }
        let res: any = [];
        this.noticeIngameService.setNoticeData(value)
            .subscribe(
            getNoticeData => {
                res = getNoticeData;
                if (res.result === 100) {
                    this.getNoticeData = res.data;
                    console.log(' this.getNoticeData', res)
                    $('#noticetxt').val('');
                    swal("성공", "정상적으로 유저 공지가 전달 되었습니다.", "success");
                } else {
                    $('#noticetxt').val('');
                    swal("It can't find data", "Result Number is " + res.result, "error");
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
