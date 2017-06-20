import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { DockerUIComponent } from '../../components/docker-ui/docker-ui.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RegistryContentComponent } from '../../components/registry-content/registry-content.component';
import { LoginComponent } from '../../components/login/login.component';

import { DockerAPIService } from '../../services/docker-api.service';

@NgModule({
  imports: [CommonModule, HttpModule, FormsModule, InfiniteScrollModule],
  declarations: [
    DockerUIComponent,
    LoginComponent,
    LoaderComponent,
    RegistryContentComponent
  ],
  exports: [DockerUIComponent, LoginComponent],
  providers: [DockerAPIService]
})
export class DockerUIModule {}
