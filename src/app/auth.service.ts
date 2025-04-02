import { inject, Injectable, OnInit, Signal, signal } from '@angular/core';
import { authClient, Session } from '../utils/auth-client';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { concat, Observable, of, from, map } from 'rxjs';
import { Data } from '@angular/router';

export interface TgtgToken {
  access_token: string;
  access_token_ttl_seconds: number;
  refresh_token: string;
  cookie: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authClient: typeof authClient;
  private http: HttpClient = inject(HttpClient);
  private session: Session | null;

  constructor() {
    this.authClient = authClient;
    this.session = null;
  }

  isAuthenticated(): Observable<boolean> {

    if(this.session) return of(true);
    return this.getSession$().pipe(
      map( (value) => {
          return value ? value.user !== null : false;
      })  
    )  
  
  }

  //TODO: explicitly add proper return type
   login$(email: string, password: string) {
    return from(
      this.authClient.signIn.email({
      email: email,
      password: password
    }).then(
      (value) => {
        return value;
      }
    ))
  }

  fetchCredentials(email: string): Observable<HttpResponse<TgtgToken>> {
    
    const bodyObj = {
      "payload": email
    };

    const signUp$ = this.http.post<TgtgToken>('https://dibshit.store/sign_up', bodyObj, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      observe: 'response'
    });

    return signUp$;

  }

  async signUp(email: string, password: string, name: string, accessToken: string, accessTokenTTLseconds: number, refreshToken: string, cookie: string): Promise<ReturnType<typeof authClient.signUp.email>> {
    
    return await authClient.signUp.email({ 
      email: email, 
      name: name, 
      password: password,
      accessToken: accessToken, 
      accessTokenTTLseconds: accessTokenTTLseconds, 
      refreshToken: refreshToken, 
      cookie: cookie });
  
  }

  getSession$(): Observable<Session> {
    if(this.session) return of(this.session);
    return from(
      this.authClient.getSession().then((value) => {

        console.log(value.data);
        
        this.session = value.data as Session ?? null;
        
        return value.data!;
      }
    ));
  }
}

