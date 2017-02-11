import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() private loading:boolean;

  public constructor() { }

  public ngOnInit() {
    this.loading = true;
  }

}
