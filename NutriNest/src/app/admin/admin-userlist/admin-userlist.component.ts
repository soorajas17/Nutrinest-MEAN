import { Component } from '@angular/core';
import { AdminHeaderComponent } from "../Component/admin-header/admin-header.component";
import { AdminSidebarComponent } from "../Component/admin-sidebar/admin-sidebar.component";
import { FooterComponent } from "../../component/footer/footer.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-userlist',
  standalone: true,
  imports: [AdminHeaderComponent, AdminSidebarComponent, FooterComponent],
  templateUrl: './admin-userlist.component.html',
  styleUrl: './admin-userlist.component.css'
})
export class AdminUserlistComponent {

  constructor(private api: ApiService) { }

  allUsers: any = []

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.api.getAllUsersApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allUsers = res
      }, error: (err: any) => {
        console.log(err);

      }
    })
  }
}
