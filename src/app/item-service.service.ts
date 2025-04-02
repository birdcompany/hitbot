import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { map, merge, Observable, tap, switchMap, of, filter } from 'rxjs';
import { AuthService } from './auth.service';
import { Session } from '../utils/auth-client';

export interface TooGoodToGoObjectResponse {
  items: TooGoodToGoObject[];
  items_expanded_radius: Array<any>;
}
export interface TooGoodToGoObject {
  display_name: string;
  item: ItemObject;
  items_available: number;
}
export interface ItemObject {
  item_id: string;
  item_category: string;
  cover_picture: cover_picture;
  logo_picture: logo_picture;
  description: string;
}
export interface cover_picture {
  current_url: string;
}
export interface logo_picture {
  current_url: string;
}

export interface User {
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  
  private favoriteBody: object;

  private bodyObj: object;

  private http: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  //remove this?
  items: WritableSignal<TooGoodToGoObject[]> = signal([]);
  
  constructor() {
    
    this.favoriteBody = {
      "origin": {"latitude": 0.0, "longitude": 0.0},
      "radius": 21,
      "page_size": 20,
      "page": 1,
      "discover": false,
      "favorites_only": true,
      "item_categories": [],
      "diet_categories": [],
      "pickup_earliest": null,
      "pickup_latest": null,
      "search_phrase": null,
      "with_stock_only": false,
      "hidden_only": false,
      "we_care_only": false
    };

    this.bodyObj = {};
  }

  private queryItemEndpoint$(session: Session): Observable<object> {

    this.bodyObj = {
      "auth": `Bearer ${session.user.accessToken}`,
      "cookie": session.user.cookie,
      "payload": this.favoriteBody
    };

    return this.http.post<object>('https://dibshit.store/items', this.bodyObj, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      withCredentials: true
    });
  }
  
  getItems(): Observable<TooGoodToGoObject[]> {

    return this.authService.getSession$().pipe(
      switchMap((value) => {

        const session = value as Session;

        if(session) {
          return this.queryItemEndpoint$(session).pipe(
            map( (value) => {
              const tgtgItems = value as TooGoodToGoObjectResponse;

              if(tgtgItems) {
                console.log(tgtgItems);
                return tgtgItems.items;
              }

              console.error('Error while querying item endpoint');
              
              return [];
            }),
            tap( (value: TooGoodToGoObject[]) => {
              this.items.set(value);
            })
          );
        }
        return of({});
      })
    ) as Observable<TooGoodToGoObject[]>;

  }

  orderItem(itemId: string): Observable<object> {
    
    this.bodyObj = {
      //"auth": this.authorization,
      //"cookie": this.cookie,
      "payload": itemId
    };

    return this.http.post<object>('/order_item', this.bodyObj, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}
