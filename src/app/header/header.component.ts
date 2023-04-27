import { Router } from '@angular/router';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedin: boolean = false;
  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {

    if (this.authService.checklogin()) {
      this.isLoggedin = true;
    }

  }


  logout() {
    this.authService.logout();
    this.router.navigate(['./login']);

  }


}
