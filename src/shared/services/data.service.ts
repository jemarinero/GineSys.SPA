import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
      .map(response => response)
      .catch(this.handleError);
  }

  getOcupacion(id) {
    return this.http.get(this.url + '/' + id)
        .map(response => response)
        .catch(this.handleError);
  }

  create(resource) {
    return this.http.post(this.url, resource)
      .map(response => response)
      .catch(this.handleError);
  }

  update(id, resource) {
    return this.http.put(this.url + '/' + id,resource)
      .map(response => response)      
      .catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .map(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if(applicationError) {
        return Observable.throw(applicationError);
    }

    const serverError = error.json();
    let modelStateErrors = '';
    if(serverError) {
        for(const key in serverError) {
            if(serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
            }
        }
    }
    return Observable.throw(
        modelStateErrors || 'Server Error'
    );
}
}
