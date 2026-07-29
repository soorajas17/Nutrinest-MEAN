import { Component } from '@angular/core';
import { HeaderComponent } from "../../users/component/header/header.component";
import { RouterLink } from "@angular/router";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  homeRecipes: any = []
  allTestimonials:any=[]

  constructor(private api: ApiService) { }

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
  getTestimonials(){
    this.api.getAllTestimonialApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allTestimonials=res
      }, error: (err: any) => {
        console.log(err);

      }
    })
  }
  
}
