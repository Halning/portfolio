import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, data: {title: 'Home'}},
    {path: 'about', component: AboutMeComponent, data: {title: 'About Me'}},
    {path: 'skills', component: SkillsComponent, data: {title: 'Skills'}},
    {path: 'projects', component: ProjectsComponent, data: {title: 'Projects'}},
    {path: 'contacts', component: ContactComponent, data: {title: 'Contacts'}},

    {path: '**', component: PageNotFoundComponent, data: {title: 'Not Found'}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
