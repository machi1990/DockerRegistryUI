import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { DockerUIModule } from './modules/docker-ui/docker-ui.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpModule, DockerUIModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
