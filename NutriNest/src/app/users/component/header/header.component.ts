import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import Swal from 'sweetalert2';

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

  // goToRecipes
    goToRecipes() {
      const existingUser = sessionStorage.getItem("existingUser")
      if (existingUser) {
        this.router.navigateByUrl("/all-recipes")
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Please login to explore recipes",
          icon: "warning"
        })
      }
    }

  Logout() {
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    this.router.navigateByUrl("/")
  }

}
