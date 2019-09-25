import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { SecurepageComponent } from './securepage/securepage.component';
import { AuthorizationGuard } from './authentication/AuthorizationGuard';


const routes: Routes = [
  {path: 'authentication/signin', component: SigninComponent},
  {path: 'securepage', component:SecurepageComponent,   canActivate: [AuthorizationGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
