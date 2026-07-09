import { Component } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  name: string = ""
  email: string = ""
  message: string = ""

  constructor(private api: ApiService) { }

  addTestimonials() {
    this.api.addTestimonialApi({ name: this.name, email: this.email, message: this.message }).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: "Good job!",
          text: "Testimonial addedd successfully",
          icon: "success"
        });
        this.name = ""
        this.email = ""
        this.message = ""

      }, error: (err: any) => {
        console.log(err);
        Swal.fire({
          title: "Oops!",
          text: "something went wrong!",
          icon: "error"
        });
      }
    })
  }

}
