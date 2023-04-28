import { AuthServiceService } from './auth-service.service';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  loadedUser?: User;

  headers: any;
  serviceUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient, private authService: AuthServiceService) {
    const user = localStorage.getItem('userData');

    if (!user) return;

    const parsedUser: {
      user: any;
      _token: string;
      serverCurrentTime: number;
      _tokenExpirationTime: number;
    } = JSON.parse(user);
    this.loadedUser = new User(
      parsedUser.user,
      parsedUser._token,
      parsedUser.serverCurrentTime,
      parsedUser._tokenExpirationTime
    );

  }


  getAllProperties(): Observable<any> {
    return this.http.get<any>(this.serviceUrl + "property");
  }

  addProperty(property: any): Observable<any> {
    return this.http.post<any>(this.serviceUrl + "property", property);
  }


  deleteProperty(id: any): Observable<any> {
    return this.http.delete<any>(this.serviceUrl + "property" + "/" + id);
  }

  handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error.message);
  }

}

