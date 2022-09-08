import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private userService: UserService) { }

  routerActive: string = "activelink";

  logout() {
    this.userService.logout();
  }


  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/courses",
      icon: "book",
      menu: "Courses",
    },
    {
      link: "/calendar",
      icon: "calendar",
      menu: "Calendar",
    },
    {
      link: "/profile",
      icon: "user",
      menu: "Profile",
    },
    {
      link: "/management",
      icon: "settings",
      menu: "Management",
    },
    // {
    //   link: "/alerts",
    //   icon: "settings",
    //   menu: "alerts",
    // },
    // {
    //   link: "/snackbar",
    //   icon: "settings",
    //   menu: "snackbar",
    // },
    // {
    //   link: "/chips",
    //   icon: "settings",
    //   menu: "Chip",
    // },
    // {
    //   link: "/toolbar",
    //   icon: "settings",
    //   menu: "toolbar",
    // },
    // {
    //   link: "/snackbar",
    //   icon: "settings",
    //   menu: "snackbar",
    // },
    // {
    //   link: "/tooltip",
    //   icon: "settings",
    //   menu: "tooltip",
    // },
    // {
    //   link: "/button",
    //   icon: "settings",
    //   menu: "button",
    // },
    
    
  ]

}
