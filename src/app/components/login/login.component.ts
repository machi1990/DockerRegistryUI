import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DockerAPIService } from '../../services/docker-api.service';

import { Credential } from '../../interfaces/credential';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DockerAPIService]
})
export class LoginComponent implements OnInit {
  @Output() private logged: EventEmitter<boolean>;
  private credential: Credential;
  private valid: boolean;

  public constructor(private service: DockerAPIService) {
    this.logged = new EventEmitter<boolean>();
    this.credential = { username: '', password: '' };
    this.valid = true;
  }

  public ngOnInit(): void {
    this.onSubmit();
  }

  private onSubmit(): void {
    this.service.authenticate(this.credential).subscribe(
      (data: Object) => {
        this.logged.emit(true);
      },
      (error: Error) => {
        this.valid = false;
        this.logged.emit(false);
      }
    );
  }
}
