import { Component } from '@angular/core';
import { AdminHeaderComponent } from "../Component/admin-header/admin-header.component";
import { AdminSidebarComponent } from "../Component/admin-sidebar/admin-sidebar.component";
import { FooterComponent } from "../../component/footer/footer.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-downloadlist',
  standalone: true,
  imports: [AdminHeaderComponent, AdminSidebarComponent, FooterComponent],
  templateUrl: './admin-downloadlist.component.html',
  styleUrl: './admin-downloadlist.component.css'
})
export class AdminDownloadlistComponent {

  constructor(private api: ApiService) { }

  allDownloads: any = []

  ngOnInit() {
    this.getAllDownloads()
  }

  getAllDownloads() {
    this.api.getAllDownloadsApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allDownloads = res
      }, error: (err: any) => {
        console.log(err);

      }
    })
  }

}
