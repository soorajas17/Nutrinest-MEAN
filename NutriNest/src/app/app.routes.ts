import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './users/pages/register/register.component';
import { AboutComponent } from './users/pages/about/about.component';
import { ProfileComponent } from './users/pages/profile/profile.component';
import { ContactComponent } from './users/pages/contact/contact.component';
import { RecipeComponent } from './users/pages/recipe/recipe.component';
import { ViewRecipeComponent } from './users/pages/view-recipe/view-recipe.component';
import { SavedRecipeComponent } from './users/pages/saved-recipe/saved-recipe.component';
import { PnfComponent } from './pages/pnf/pnf.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUserlistComponent } from './admin/admin-userlist/admin-userlist.component';
import { AdminDownloadlistComponent } from './admin/admin-downloadlist/admin-downloadlist.component';
import { AdminFeedbacklistComponent } from './admin/admin-feedbacklist/admin-feedbacklist.component';
import { AdminRecipelistComponent } from './admin/admin-recipelist/admin-recipelist.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },

    // users
    { path: "register", component: RegisterComponent },
    { path: "about", component: AboutComponent },
    { path: "profile", component: ProfileComponent },
    { path: "contact", component: ContactComponent },
    { path: "all-recipes", component: RecipeComponent },
    { path: "view/:id", component: ViewRecipeComponent },
    { path: "saved-recipe", component: SavedRecipeComponent },


    // admin
    {path:"admin-dashboard",component:AdminDashboardComponent},
    {path:"admin-userlist",component:AdminUserlistComponent},
    {path:"admin-downloadlist",component:AdminDownloadlistComponent},
    {path:"admin-feedback",component:AdminFeedbacklistComponent},
    {path:"admin-recipelist",component:AdminRecipelistComponent},


    // 
    { path: "**", component: PnfComponent }
];
