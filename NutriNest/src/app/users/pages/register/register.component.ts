import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: any = {}

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.registerForm = fb.group({
      username: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]
    })
  }

  register() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      Swal.fire({
        title: "Oops!",
        text: "Fill the form completely!",
        icon: "info"
      });
    } else {
      this.api.registerApi(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Good job!",
            text: "Registration successfull",
            icon: "success"
          });
          this.router.navigateByUrl('/login')
        },
        error: (err: any) => {
          console.log(err);
          if (err.status == 406) {
            Swal.fire({
              title: "Oops!",
              text: `${err.error} `,
              icon: "error"
            });
            this.registerForm.reset()
          } else {
            Swal.fire({
              title: "Oops!",
              text: `Something went wrong, ${err.error} `,
              icon: "error"
            });
            this.registerForm.reset()
          }

        }
      })
    }
  }
}


