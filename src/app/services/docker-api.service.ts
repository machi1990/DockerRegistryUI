import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions,URLSearchParams} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Credential} from '../interfaces/credential';
import {Manifest} from '../interfaces/manifest';

@Injectable()
export class DockerAPIService {

  private credential: Credential;

  public constructor(private http: Http) {
      this.credential = {username:'',password:''};
  }

  public authenticate(credential:Credential): Observable<Object> {
    this.credential = credential || {username:'',password:''};
    const options:RequestOptions = this.createOptions();
    return this.http.get('/v2/',options).map(this.extractData).catch(this.handleError);
  }

  /*
   * add a basic authorization header.
  */
  private createOptions():RequestOptions {
      const headers:Headers = new Headers({'Content-Type': 'application/json'/*,'Authorization':  this.basicAuth()*/});
      return new RequestOptions({ headers: headers });
  }

  private basicAuth():string {
      return "Basic " + btoa(this.credential.username + ":" + this.credential.password);
  }

  public catalog():Observable<Array<string>> {
    const options:RequestOptions = this.createOptions();
    return this.http.get('/v2/_catalog',options)
    .map((res:Response) => {
        const data:Object = this.extractData(res);
        return data['repositories'];
    })
    .catch(this.handleError);
  }

  public tags(image:string): Observable<Array<string>> {
    const options:RequestOptions = this.createOptions();
    const endpoint:string = '/v2/' + image + '/tags/list';
    return this.http.get(endpoint,options)
    .map((res:Response) => {
        const data:Object = this.extractData(res);
        return data['tags'];
    })
    .catch(this.handleError);
  }

  public manifests(image:string,reference:string): Observable<Manifest> {
    const options:RequestOptions = this.createOptions();
    const endpoint:string = '/v2/' + image + '/manifests/' + reference;

    return this.http.get(endpoint,options)
    .map((res:Response) => {
        const data:Object = this.extractData(res);
        let infos:Object = data['history'] ? JSON.parse(data['history'][0]['v1Compatibility']) : {};

        return {
            name: data['name'],
            tag: data['tag'],
            archi: data['architecture'],
            infos: infos
        };
    })
    .catch(this.handleError);
  }

  public digest(image:string,tag:string):Observable<Object> {
      const endpoint:string = '/v2/' + image + '/manifests/' + tag;

      let options: RequestOptions = this.createOptions();
      options.headers.append("Accept","application/vnd.docker.distribution.manifest.v2+json");

      return this.http.get(endpoint,options)
      .map((res:Response) => {
          return {
            digest: res.headers.get('docker-content-digest'),
            data : this.extractData(res)
          };
      })
      .catch(this.handleError);
  }

  public delete(name:string,digest:string): Observable<string> {
    const endpoint:string = '/v2/'+ name + '/manifests/'+ digest,
           options: RequestOptions = this.createOptions();

    return this.http.delete(endpoint,options).map(this.extractData).catch(this.handleError);
  }

  public deleteBlob(name:string,digest:string): Observable<Object> {
     const endpoint:string = '/v2/'+ name + '/blobs/'+ digest,
            options: RequestOptions = this.createOptions();

     return this.http.delete(endpoint,options).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body:Object = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In the future, we might use a remote logging infrastructure.
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
