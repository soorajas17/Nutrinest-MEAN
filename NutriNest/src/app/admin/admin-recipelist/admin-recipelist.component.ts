import { Component } from '@angular/core';
import { AdminHeaderComponent } from "../Component/admin-header/admin-header.component";
import { AdminSidebarComponent } from "../Component/admin-sidebar/admin-sidebar.component";
import { ApiService } from '../../services/api.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-recipelist',
  standalone: true,
  imports: [AdminHeaderComponent, AdminSidebarComponent, NgMultiSelectDropDownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-recipelist.component.html',
  styleUrl: './admin-recipelist.component.css'
})
export class AdminRecipelistComponent {

  allRecipes: any = []
  cuisineType: any = []
  mealType: any = []
  dropdownList: any = []
  dropdownSettings: IDropdownSettings = {}
  recipeForm: any = []

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.recipeForm = fb.group({
      name: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      prepTimeMinutes: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      caloriesPerServing: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      servings: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      cookTimeMinutes: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      difficulty: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      cuisine: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      mealType: [[], [Validators.required]],
      ingredients: [[], [Validators.required]],
      instructions: [[], [Validators.required]],
      image: [[], [Validators.required]],
    })
  }

  ngOnInit() {
    this.getAllRecipes()
    this.dropdownList = [
      { item_id: 1, item_text: 'Dinner' },
      { item_id: 2, item_text: 'Lunch' },
      { item_id: 3, item_text: 'Snack' },
      { item_id: 4, item_text: 'Dessert' },
      { item_id: 5, item_text: 'Side Dish' },
      { item_id: 5, item_text: 'Appetizer' },
      { item_id: 5, item_text: 'Snacks' },
      { item_id: 5, item_text: 'Breakfast' },
      { item_id: 5, item_text: 'Beverage' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  onItemSelect(event: any) {
    console.log(event);
    this.recipeForm.value.mealType.push(event.item_text)
  }
  onSelectAll(event: any) {
    console.log(event);
    event.forEach((item: any) => {
      this.recipeForm.value.mealType.push(item.item_text)
    })
  }

  deleteItem(event: any) {
    this.recipeForm.value.mealType = this.recipeForm.value.mealType.filter((item: any) => item != event.item_text)
  }

  deleteAllItem() {
    this.recipeForm.value.mealType = []
  }

  addIngredients(data: any) {
    console.log(data.value);
    this.recipeForm.value.ingredients.push(data.value)
    data.value = ""
  }

  addInstructions(data: any) {
    console.log(data.value);
    this.recipeForm.value.instructions.push(data.value)
    data.value = ""

  }

  // file
  getFile(event: any) {
    console.log(event);
    // 1. instane file to url
    const fr = new FileReader()
    // 2. 
    fr.readAsDataURL(event.target.files[0])
    // access the url - onload()
    fr.onload = (event: any) => {
      console.log(event.target.result);
      this.recipeForm.value.image = event.target.result
    }
  }

  getAllRecipes() {
    this.api.allRecipesApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allRecipes = res
        this.allRecipes.map((item: any) => {
          !this.cuisineType.includes(item.cuisine) && this.cuisineType.push(item.cuisine)
        })
        console.log(this.cuisineType);

        this.allRecipes.map((item: any) => {
          item.mealType.map((item: any) => {
            !this.mealType.includes(item) && this.mealType.push(item)
          })
          console.log(this.mealType);
        })

      }, error: (err: any) => {
        console.log(err);

      }
    })
  }

  // saveRecipe
  saveRecipe() {
    console.log(this.recipeForm.value);
    if (this.recipeForm.value.invalid) {
      alert("fill the form completely..")
    } else {
      this.api.addRecipeApi(this.recipeForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.getAllRecipes()
        }, error: (err: any) => {
          console.log(err);

        }
      })
    }
  }

  // delete recipe
  deleteRecipe(id: any) {
    this.api.deleteRecipeApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getAllRecipes()
      }, error: (err: any) => {
        console.log(err);

      }
    })
  }

}
