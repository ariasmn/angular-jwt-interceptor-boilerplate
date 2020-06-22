import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component'

const routes: Routes = [  {
  path: '',
  pathMatch: 'full',
  component: ListComponent
},
{
  path: '**',
  component: ListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
