import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverURL: string = "http://localhost:4000"

  constructor(private http: HttpClient) { }

  // registerApi
  registerApi(reqBody: any) {
    return this.http.post(`${this.serverURL}/user-register`, reqBody)
  }
  // loginApi
  loginApi(reqBody: any) {
    return this.http.post(`${this.serverURL}/user-login`, reqBody)
  }
  // home recipes Api
  homeRecipesApi() {
    return this.http.get(`${this.serverURL}/home-recipes`)
  }

  // All recipes Api
  allRecipesApi() {
    return this.http.get(`${this.serverURL}/all-recipes`)
  }
  // getARecipeApi
  getARecipeApi(id: string) {
    return this.http.get(`${this.serverURL}/view-recipe/${id}`)
  }

  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")

    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }

    return { headers }
  }


  // add saved recipe
  savedRecipeApi(id: string, reqBody: any) {
    return this.http.post(`${this.serverURL}/add-savedrecipe/${id}`, reqBody, this.appendToken())
  }

  // get particular user saved recipes
  getAllUserSavedRecipeApi() {
    return this.http.get(`${this.serverURL}/all-savedrecipes`, this.appendToken())
  }
  // delete particular user saved recipes
  deleteASavedRecipeApi(id: string) {
    return this.http.delete(`${this.serverURL}/delete-savedrecipes/${id}`, this.appendToken())
  }
  // download recipes
  downloadRecipeApi(id: string, reqBody: any) {
    return this.http.post(`${this.serverURL}/download-recipe/${id}`, reqBody, this.appendToken())
  }
  // download recipes
  getUserDownloadRecipeApi() {
    return this.http.get(`${this.serverURL}/all-user-downloads`, this.appendToken())
  }
  // add-testimonial
  addTestimonialApi(reqBody: any) {
    return this.http.post(`${this.serverURL}/add-testimonial`, reqBody)
  }

  // update profile
  updateProfileApi(reqBody: any) {
    return this.http.put(`${this.serverURL}/update-profile`, reqBody, this.appendToken())
  }

  // ---------------admin----------------
  getAllUsersApi() {
    return this.http.get(`${this.serverURL}/get-allusers`)
  }
  // get-alldownloads
  getAllDownloadsApi() {
    return this.http.get(`${this.serverURL}/get-alldownloads`)
  }
  // get-allTestimonialApi
  getAllTestimonialApi() {
    return this.http.get(`${this.serverURL}/all-testimonials`)
  }
  // update Testimonial
  updateTestimonialApi(reqBody: any) {
    return this.http.put(`${this.serverURL}/update-testimonials`, reqBody)
  }
  // add recipe api
  addRecipeApi(reqBody: any) {
    return this.http.post(`${this.serverURL}/add-recipe`, reqBody)
  }
  // deleteRecipeApi
  deleteRecipeApi(id: any) {
    return this.http.delete(`${this.serverURL}/delete-recipe/${id}`)
  }

}
