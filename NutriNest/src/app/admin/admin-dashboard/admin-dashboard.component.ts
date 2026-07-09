import { Component } from '@angular/core';
import { AdminHeaderComponent } from "../Component/admin-header/admin-header.component";
import { AdminSidebarComponent } from "../Component/admin-sidebar/admin-sidebar.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminHeaderComponent, AdminSidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  allUsers: number = 0
  allDownloads: number = 0
  allTestimonials: number = 0
  allRecipes: number = 0

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllUsers()
    this.getAllDownloads()
    this.getAllRecipes()
    this.getAllTestimonials()
  }

  getAllUsers() {
    this.api.getAllUsersApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allUsers = res.length
        console.log(this.allUsers);

      }, error: (err: any) => {
        console.log(err);

      }
    })
  }
  getAllRecipes() {
    this.api.allRecipesApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allRecipes = res.length
      }, error: (err: any) => {
        console.log(err);

      }
    })
  }
  getAllDownloads() {
    this.api.getAllUsersApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allDownloads = res.length
      }, error: (err: any) => {
        console.log(err);

      }
    })
  }
  getAllTestimonials() {
    this.api.getAllTestimonialApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allTestimonials = res.filter((item: any) => item.status == 'pending').length
      }, error: (err: any) => {
        console.log(err);

      }
    })
  }

}
