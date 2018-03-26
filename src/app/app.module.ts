import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

export * from './shared/search/search.service';

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule ,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
