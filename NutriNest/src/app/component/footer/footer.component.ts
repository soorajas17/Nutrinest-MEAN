import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router: Router) { }

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

}
