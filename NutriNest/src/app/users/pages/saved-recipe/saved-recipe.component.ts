import { Component } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent {

  constructor(private api: ApiService, private router: Router) { }

  savedRecipes: any = []

  ngOnInit() {
    this.getAllUserSavedRecipe()
  }

  getAllUserSavedRecipe() {
    this.api.getAllUserSavedRecipeApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.savedRecipes = res
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

  viewRecipe(id: string) {
    this.router.navigateByUrl(`/view/${id}`)
  }

  deleteASavedRecipe(id: string) {
    this.api.deleteASavedRecipeApi(id).subscribe({
      next: (res: any) => {
        this.getAllUserSavedRecipe()
        console.log(res);
        Swal.fire({
          title: "Good job!",
          text: "Recipe remove successfully...",
          icon: "success"
        });
      }, error: (err: any) => {
        console.log(err);
        Swal.fire({
          title: "Ooops!",
          text: "Something went wrong..",
          icon: "error"
        });
      }
    })
  }
}
