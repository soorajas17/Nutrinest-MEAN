import { Component } from '@angular/core';
import { HeaderComponent } from "../../users/component/header/header.component";
import { Router, RouterLink } from "@angular/router";
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  homeRecipes: any = []
  allTestimonials: any = []

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getHomeRecipes()
    this.getTestimonials()
  }

  getHomeRecipes() {
    this.api.homeRecipesApi().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.homeRecipes = res
        console.log(this.homeRecipes);

      }, error: (err: any) => {
        console.log(err);

      }
    })
  }

  // getTestimonials
  getTestimonials() {
    this.api.getAllTestimonialApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allTestimonials = res
      }, error: (err: any) => {
        console.log(err);

      }
    })
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

}
