import { Component, OnInit } from '@angular/core';
import {DockerAPIService} from '../../services/docker-api.service';

import {Manifest} from '../../interfaces/manifest';

@Component({
  selector: 'app-docker-ui',
  templateUrl: './docker-ui.component.html',
  styleUrls: ['./docker-ui.component.css']
})
export class DockerUIComponent implements OnInit {

  private images:Array<string>;
  private loading:boolean;
  private manifests: Object;

  public constructor(private service:DockerAPIService) {

  }

  public ngOnInit():void {
      this.init();
  }

  private init():void {
    this.images = [];
    this.loading = true;
    this.manifests = {};

    this.service.catalog().subscribe((images:Array<string>) => {
        this.images = images;
        this.loading = false;
        this.images.forEach((image:string) => {
            this.tag(image);
        });
    }, (error:Error) => {
        console.error(error);
        this.loading = false;
    });
  }

  private tag(image:string):void {
    this.manifests[image] = [];
    this.service.tags(image).subscribe((tags:Array<string>) => {
        if (!tags) {
            return;
        }

        tags.forEach((tag:string) => {
            this.service.manifests(image,tag).subscribe((manifest:Manifest) => {
                this.manifests[image].push(manifest);
            }, (error:Error) => {
                console.error(error);
            });
        });
    }, (error:Error) => {
        this.manifests[image] = [];
    })
  }

  private delete(ref:Object): void {
    this.service.digest(ref['name'],ref['tag']).subscribe((res:Object) => {
        const digest = res['digest'];
        /*
        const layers = res['data']['layers'] || [];

        layers.forEach((layer:Object) => {
            console.log(layer);
            this.service.deleteBlob(ref['name'],layer['digest']).subscribe((rez:Object) => {
                console.log(rez);
            },
            (err:Error) => {
              console.error(err);
            }
          );
        }); */

      this.service.delete(ref['name'],digest).subscribe((rez:Object) => {
          console.log(rez);
      }, (err:Error) => {
        console.error(err);
      })
    }, (error:Error) => {
        console.error(error);
    });
  }
}
