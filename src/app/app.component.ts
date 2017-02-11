import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private authenticated: boolean = true; // false if login needed

  public constructor () {

  }

  public onLoggedEvent(event:boolean): void {
    this.authenticated = event;
  }
}
