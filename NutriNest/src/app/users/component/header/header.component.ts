import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogin: boolean = false

  constructor(private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      this.isLogin = true
    }
  }

  Logout() {
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    this.router.navigateByUrl("/")
  }

}
