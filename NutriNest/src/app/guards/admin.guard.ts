import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const existingUser = JSON.parse(sessionStorage.getItem("existingUser") || "null")
  if (existingUser && existingUser.role == "admin") {
    return true;
  } else {
    alert("Please login as Admin")
    router.navigateByUrl("/login")
    return false
  }

};
