import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "angular\/ng-bootstrap",
                "loadChildren": ".\/pages\/default\/angular\/ng-bootstrap\/ng-bootstrap.module#NgBootstrapModule"
            },
            {
                "path": "angular\/primeng",
                "loadChildren": ".\/pages\/default\/angular\/primeng\/primeng.module#PrimengModule"
            },
            {
                "path": "index",
                "loadChildren": ".\/pages\/default\/index\/index.module#IndexModule"
            },
            {
                "path": "components\/operator\/user-detail",
                "loadChildren": ".\/pages\/default\/components\/section-operator\/user-detail\/user-detail.module#UserDetailModule"
            },
            {
                "path": "components\/operator\/notification-push",
                "loadChildren": ".\/pages\/default\/components\/section-operator\/notification-push\/notification-push.module#NotificationPushModule"
            },
            {
                "path": "components\/operator\/server-maintenance",
                "loadChildren": ".\/pages\/default\/components\/section-operator\/server-maintenance\/server-maintenance.module#ServerMaintenanceModule"
            },
            {
                "path": "components\/system\/server-manage",
                "loadChildren": ".\/pages\/default\/components\/section-system\/server-manage\/server-manage.module#ServerManageModule"
            },
            {
                "path": "snippets\/faq\/faq-1",
                "loadChildren": ".\/pages\/default\/snippets\/faq\/faq-faq-1\/faq-faq-1.module#FaqFaq1Module"
            },
            {
                "path": "404",
                "loadChildren": ".\/pages\/default\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }