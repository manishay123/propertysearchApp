import { Router } from '@angular/router';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName!: string;
  roleName !: string;
  isLoggedin: boolean = false;
  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {

    this.roleName = this.authService.user.value?.user.roleName;
    this.userName = this.authService.user.value?.user.userName;

    if (this.authService.checklogin()) {
      this.isLoggedin = true;
    }

  }


  logout() {
    this.authService.logout();
    this.router.navigate(['./login']);

  }


}
