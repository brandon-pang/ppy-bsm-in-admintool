import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EventListsComponent } from './event-lists.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '../../../../../layouts/layout.module';
import { DefaultComponent } from '../../../default.component';

const routes: Routes = [
    {
        path: "",
        component: DefaultComponent,
        children: [
            {
                path: "",
                component: EventListsComponent
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
        EventListsComponent
    ]
})
export class  EventListsModule {

}
