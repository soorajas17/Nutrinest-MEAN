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
  constructor(private api: ApiService) { }

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
  ngOnInit() {
    this.getHomeRecipes()
  }
}
