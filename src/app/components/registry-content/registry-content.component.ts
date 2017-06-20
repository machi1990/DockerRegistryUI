import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Manifest } from '../../interfaces/manifest';

@Component({
  selector: 'app-registry-content',
  templateUrl: './registry-content.component.html',
  styleUrls: ['./registry-content.component.css']
})
export class RegistryContentComponent implements OnInit {
  @Input() private loading: boolean;
  @Input() private images: Array<string>;
  @Input() private manifests: Object;

  @Output() private candelete: EventEmitter<Object>;

  public constructor() {
    this.init();
  }

  public ngOnInit(): void {}

  private init(): void {
    this.loading = true;
    this.images = [];
    this.manifests = {};
    this.candelete = new EventEmitter<Object>();
  }

  private onScrollDown(): void {}

  private onScrollUp(): void {}

  private is1st(index: number): boolean {
    return index === 0;
  }

  private delete(imageName: string): void {
    const manifests: Array<Manifest> = this.manifests[imageName];
    manifests.forEach((manifest: Manifest) => {
      this.deleteTag(imageName, manifest.tag);
    });
  }

  private deleteTag(imageName: string, tag: string) {
    this.candelete.emit({
      name: imageName,
      tag: tag
    });
  }

  private manifestsOfImage(image: string): Array<Manifest> {
    const manifests: Array<Manifest> = this.manifests[image] || [];
    return manifests;
  }

  private createdOn(dateString: string): string {
    const date: Date = new Date(dateString);
    return date.toLocaleDateString();
  }

  private author(author: string): string {
    if (!author) {
      return '-';
    }

    return author;
  }

  private ports(portsObject: Object): Array<string> {
    const keys: Array<string> = Object.keys(portsObject);
    return keys;
  }

  private normalize(args: any): Array<string> {
    if (!args) {
      return [];
    }

    if (this.isObject(args)) {
      const newargs: Array<string> = [];
      for (let i in args) {
        newargs.push(i + '=' + args[i]);
      }
      return newargs;
    }

    return args;
  }

  private isObject(obj: any): boolean {
    if (obj === null) {
      return false;
    }

    return typeof obj === 'object' && !Array.isArray(obj);
  }
}
