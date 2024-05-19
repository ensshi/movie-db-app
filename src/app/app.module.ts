import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Service } from './pages/shared/service';
import { SearchComponent } from './pages/search/search.component';
import { DetailsComponent } from './pages/details/details.component';

@NgModule({
  declarations: [AppComponent, SearchComponent, DetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
