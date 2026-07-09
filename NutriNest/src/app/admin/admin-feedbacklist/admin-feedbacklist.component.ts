import { Component } from '@angular/core';
import { FooterComponent } from "../../component/footer/footer.component";
import { AdminSidebarComponent } from "../Component/admin-sidebar/admin-sidebar.component";
import { AdminHeaderComponent } from "../Component/admin-header/admin-header.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-feedbacklist',
  standalone: true,
  imports: [FooterComponent, AdminSidebarComponent, AdminHeaderComponent],
  templateUrl: './admin-feedbacklist.component.html',
  styleUrl: './admin-feedbacklist.component.css'
})
export class AdminFeedbacklistComponent {

  constructor(private api: ApiService) { }

  allTestimonials: any = []

  ngOnInit() {
    this.getAllTestimonials()
  }

  getAllTestimonials() {
    this.api.getAllTestimonialApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allTestimonials = res
      }, error: (err: any) => {
        console.log(err);

      }
    })
  }

  // updateTestimonials
  updateTestimonials(id: string, status: string) {
    console.log(id, status);

    this.api.updateTestimonialApi({ id, status }).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getAllTestimonials()
      }, error: (err: any) => {
        console.log(err);

      }
    })
  }

}
