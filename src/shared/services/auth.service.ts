import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {
    baseUrl = environment.apiUrl+'auth';
    userToken: any;
    decodedToken: any;

    constructor(private http: Http, 
        private jwtHelper: JwtHelperService,
        private route: ActivatedRoute
        ) { }

    login(model: any) {
        return this.http.post(this.baseUrl + '/login', model, this.requestOptions())
            .map((response: Response) => {
                const user = response.json();
                if(user) {
                    localStorage.setItem('token',user.tokenString);
                    this.userToken = user.tokenString;
                    this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
                }
            }).catch(this.handleError);
    }

    register(model: any) {
        return this.http.post(this.baseUrl + '/register', model, this.requestOptions())
            .catch(this.handleError);
    }

    loggedIn() {
        return !this.jwtHelper.isTokenExpired();
    }

    getActiveUrl() {
        return this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';     
    }

    private requestOptions() {
        const headers = new Headers({'Content-type': 'application/json'});
        return new RequestOptions({headers: headers});
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
