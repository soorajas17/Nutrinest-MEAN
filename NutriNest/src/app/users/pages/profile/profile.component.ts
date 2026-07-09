import { Component } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  downloadRecipes: any = []
  profileImage: any = ""

  constructor(private api: ApiService, private router: Router) { }

  viewRecipe(id: string) {
    this.router.navigateByUrl(`/view/${id}`)
  }

  ngOnInit() {
    this.getDownloadRecipe()
  }

  getDownloadRecipe() {
    this.api.getUserDownloadRecipeApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.downloadRecipes = res
      }, error: (err: any) => {
        console.log(err);

      }
    })
  }


  getFile(event: any) {
    console.log(event.target.files[0]);
    // convert file to url - FileReader()
    // 1 create instance
    const fr = new FileReader()
    // 2 convert the file readAsDataURL()
    fr.readAsDataURL(event.target.files[0])
    // 3 access the url onload()
    fr.onload = (event: any) => {
      console.log(event.target.result);
      this.profileImage = event.target.result
    }
  }

  Upload() {
    if (this.profileImage) {
      this.api.updateProfileApi({ profileimage: this.profileImage }).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Good job!",
            text: "Profile Added Successfully..",
            icon: "success"
          });
          sessionStorage.setItem("existingUser",JSON.stringify(res))
        }, error: (error) => {
          console.log(error);
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong",
            icon: "error"
          });
        }
      })
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Please add a profile image.",
        icon: "info"
      });
    }
  }

}
