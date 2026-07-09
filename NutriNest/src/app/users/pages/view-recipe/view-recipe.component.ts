import { Component } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

  recipeDetailes: any = {}
  relatedRecipes: any = []

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      // console.log(res);
      const { id } = res
      // console.log(id);
      this.getARecipe(id)
    })

  }

  getARecipe(id: string) {
    this.api.getARecipeApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.recipeDetailes = res
        this.getRelatedRecipes(res.cuisine, res._id)
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

  getRelatedRecipes(cuisine: string, id: string) {
    this.api.allRecipesApi().subscribe({
      next: (res: any) => {
        console.log(res);

        this.relatedRecipes = res.filter((item: any) => item.cuisine == cuisine && item._id !== id)
        console.log(this.relatedRecipes);

      }, error: (err: any) => {
        console.log(err);

      }
    })
  }

  savedRecipes() {
    const reqBody = {
      name: this.recipeDetailes.name,
      image: this.recipeDetailes.image
    }
    this.api.savedRecipeApi(this.recipeDetailes._id, reqBody).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: "Good Job!",
          text: "Recipe added to your Saved List.",
          icon: "success"
        });
      }, error: (err: any) => {
        console.log(err);
        if (err.status == 406) {
          Swal.fire({
            title: "Oops!",
            text: `${err.error}`,
            icon: "warning"
          });
        } else {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong.",
            icon: "error"
          });
        }
      }
    })
  }

  generatePDF() {
    const pdf = new jsPDF()
    // title
    pdf.setFontSize(16)
    pdf.setTextColor("Blue")
    pdf.text(this.recipeDetailes.name, 10, 10)
    // content
    pdf.setFontSize(10)
    pdf.setTextColor("Black")
    pdf.text(`Cuisine:${this.recipeDetailes.cuisine}`, 10, 20)
    pdf.text(`Servings:${this.recipeDetailes.servings}`, 10, 25)
    pdf.text(`Mode:${this.recipeDetailes.difficulty}`, 10, 30)
    pdf.text(`Preparation Time:${this.recipeDetailes.prepTimeMinutes}`, 10, 35)
    pdf.text(`Cook Time:${this.recipeDetailes.cookTimeMinutes}`, 10, 40)
    pdf.text(`Calories:${this.recipeDetailes.caloriesPerServing}`, 10, 45)

    // table
    let head = [['Ingredients', 'Instructions',]]
    let body = []
    body.push([this.recipeDetailes.ingredients, this.recipeDetailes.instructions])
    autoTable(pdf, { head, body, startY: 60 })
    pdf.output('dataurlnewwindow')
    pdf.save(`${this.recipeDetailes.name}.pdf`)
  }

  downloadRecipe() {
    this.generatePDF()
    const reqBody = {
      name: this.recipeDetailes.name,
      cuisine: this.recipeDetailes.cuisine,
      image: this.recipeDetailes.image
    }
    this.api.downloadRecipeApi(this.recipeDetailes._id, reqBody).subscribe({
      next: (res: any) => {
        console.log(res);

      }, error: (err: any) => {
        console.log(err);

      }
    })
  }

}
