import { Component } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [HeaderComponent, DatePipe, FormsModule, SearchPipe, NgxPaginationModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

  p: number = 1;
  searchKey: string = ""
  allRecipes: any = []
  allCuisines: any = []
  mealType: any = []
  dummyRecipes: any = []
  time: any = new Date()

  constructor(private router: Router, private api: ApiService) { }

  viewRecipe(id: any) {
    this.router.navigateByUrl(`/view/${id}`)
  }

  getAllRecipes() {
    this.api.allRecipesApi().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.allRecipes = res
        this.dummyRecipes = res
        console.log(this.allRecipes);
        this.allRecipes.map((item: any) => {
          !this.allCuisines.includes(item.cuisine) && this.allCuisines.push(item.cuisine)
        })
        console.log(this.allCuisines);

        this.allRecipes.map((items: any) => {
          items.mealType.map((item: any) => {
            !this.mealType.includes(item) && this.mealType.push(item)
          })
          console.log(this.mealType);
        })

      }, error(err: any) {
        console.log(err);
      },
    })
  }

  filterCuisineType(data: any) {
    // console.log(data);
    this.allRecipes = this.dummyRecipes.filter((item: any) => item.cuisine == data)
  }

  filterMealType(data: any) {
    this.allRecipes = this.dummyRecipes.filter((item: any) => item.mealType.includes(data))
  }

  ngOnInit() {
    this.getAllRecipes()
  }

}
