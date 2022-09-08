import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthGuard } from "../guards/auth.guard";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { CoursesComponent } from "./courses/courses.component";
import { ProfileComponent } from "./profile/profile.component";
import { ManagementComponent } from "./management/management.component";
import { FullComponent } from "../layouts/full/full.component";


const routes: Routes = [
    { 
        path: '', 
        component: FullComponent,
        canActivate: [ AuthGuard ],
        // canLoad: [ AuthGuard ],
        children: [
            {path:"", component:DashboardComponent},
            {path:"home", component:DashboardComponent},
            {path:"calendar", component:CalendarComponent},
            {path:"courses", component:CoursesComponent},
            {path:"profile", component:ProfileComponent},
            {path:"management", component:ManagementComponent},
        ]
        // loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule )
      },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
