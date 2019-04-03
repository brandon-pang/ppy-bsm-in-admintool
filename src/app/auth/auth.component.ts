import {
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScriptLoaderService} from '../_services/script-loader.service';
import {AuthenticationService} from './_services/authentication.service';
import {AlertService} from './_services/alert.service';
import {UserService} from './_services/user.service';
import {AlertComponent} from './_directives/alert.component';
import {LoginCustom} from './_helpers/login-custom';
import {Helpers} from '../helpers';
import {Md5} from "ts-md5";


@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './templates/login-1.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class AuthComponent implements OnInit {
    public model: any = {};
    public returnUrl: string;
    levelNum:number;
    public levels:any = [
        {num: 0, ip:'http://122.199.219.189:20011', name: "내부: 122.199.219.189"},
        {num: 1, ip:'http://122.199.219.188:20011', name: "빌드테스트: 122.199.219.188"},
        {num: 2, ip:'http://bsm-sg.beta1.blackshot.com:20011', name: "IOS 검수: bsm-sg.beta1.blackshot.com"},
    ];
    public selectedLevel:any=this.levels[0];


    loading = false;
    md5 = new Md5();
    @ViewChild('alertSignin',
        {read: ViewContainerRef}) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup',
        {read: ViewContainerRef}) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass',
        {read: ViewContainerRef}) alertForgotPass: ViewContainerRef;

    constructor(
        private _router: Router,
        private _script: ScriptLoaderService,
        //private _userService: UserService,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver) {
    }

    ngOnInit() {
        //this.model.remember = true;
        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigate([this.returnUrl]);
        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/default/base/scripts.bundle.js'], true).then(() => {
            Helpers.setLoading(false);
            LoginCustom.init();
        });
        this.model.ip='http://110.234.23.129:20011';
    }

    signin() {
        let res: any = [];
        this.loading = true;
        let conpass = Md5.hashStr(this.model.password);
        //let connectIP=this.model.ip;
        //live
        let connectIP='http://110.234.23.129:20011';
        this._authService.login(this.model.id, conpass, connectIP).subscribe(
            data => {
                res = data;
                if (res) {
                    let result = res.result;
                    console.log(res);
                    let data = {};
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    if (result == '100') {
                        let data = {
                            userid: this.model.id,
                            fullName: 'admin',
                            email: this.model.id,
                            apikey: res.data[0].API_KEY,
                            connectIP:connectIP
                        }
                        localStorage.setItem('currentUser', JSON.stringify(data));
                        this._router.navigate([this.returnUrl]);
                    } else {
                        localStorage.removeItem('currentUser');
                        this.showAlert('alertSignin');
                        this._alertService.error('아이디 또는 패스워드가 맞지 않습니다.');
                        this.loading = false;
                    }
                }

            },
            error => {
                this.showAlert('alertSignin');
                this._alertService.error(error);
                this.loading = false;
            });
        /*
        return this._userService.verify().map(
            data => {
                if (data !== null) {
                    // logged in so return true
                    return true;
                }
                // error when verify so redirect to login page with the return url
                this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            },
            error => {
                // error when verify so redirect to login page with the return url
                this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            });
            */
    }

    /*signup() {
        this.loading = true;
        this._userService.create(this.model).subscribe(
            data => {
                this.showAlert('alertSignin');
                this._alertService.success(
                    'Thank you. To complete your registration please check your email.',
                    true);
                this.loading = false;
                LoginCustom.displaySignInForm();
                this.model = {};
            },
            error => {
                this.showAlert('alertSignup');
                this._alertService.error(error);
                this.loading = false;
            });
    }*/

    /*
    forgotPass() {
        this.loading = true;
        this._userService.forgotPassword(this.model.email).subscribe(
            data => {
                this.showAlert('alertSignin');
                this._alertService.success(
                    'Cool! Password recovery instruction has been sent to your email.',
                    true);
                this.loading = false;
                LoginCustom.displaySignInForm();
                this.model = {};
            },
            error => {
                this.showAlert('alertForgotPass');
                this._alertService.error(error);
                this.loading = false;
            });
    }
    */

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}
