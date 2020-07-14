import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ServerMaintenanceComponent } from './server-maintenance.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '../../../../../layouts/layout.module';
import { DefaultComponent } from '../../../default.component';

const routes: Routes = [
    {
        path: "",
        component: DefaultComponent,
        children: [
            {
                path: "",
                component: ServerMaintenanceComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        NgbModule.forRoot()
    ], exports: [
        RouterModule
    ], declarations: [
        ServerMaintenanceComponent
    ]
})
export class ServerMaintenanceModule { }
