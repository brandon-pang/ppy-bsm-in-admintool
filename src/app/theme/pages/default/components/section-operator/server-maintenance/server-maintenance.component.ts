import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../../../../helpers';
import { ScriptLoaderService } from '../../../../../../_services/script-loader.service';

@Component({
    selector: "app-widgets-bootstrap-datetimepicker",
    templateUrl: "./server-maintenance.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ServerMaintenanceComponent implements OnInit, AfterViewInit {
    constructor(private _script: ScriptLoaderService) {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/bootstrap-datetimepicker.js']);
        this._script.loadScripts('app-widgets-bootstrap-datetimepicker',
            ['assets/demo/default/custom/components/forms/widgets/select2.js']);
    }
}