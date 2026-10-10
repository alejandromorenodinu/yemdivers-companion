import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectBD {
  REST_API: string = 'https://api.helldivers2.dev';
  constructor(private httpclient : HttpClient) {}

  public getGalacticWar(): Observable<any>{
    return this.httpclient.get(`${this.REST_API}/api/v1/war`, {
      headers: {
        'X-Super-Client': 'yemdivers-companion',
        'X-Super-Contact': 'alejandromorenodinu@gmail.com'
      }});
  }
  public getAllPlanets(): Observable<any>{
    return this.httpclient.get(`${this.REST_API}/api/v1/planets`, {
      headers: {
        'X-Super-Client': 'yemdivers-companion',
        'X-Super-Contact': 'alejandromorenodinu@gmail.com'
      }});
  }
  public getAllPlanetsEvents(): Observable<any>{
    return this.httpclient.get(`${this.REST_API}/api/v1/planet-events`, {
      headers: {
        'X-Super-Client': 'yemdivers-companion',
        'X-Super-Contact': 'alejandromorenodinu@gmail.com'
      }});
  }
  public getMajorOrder(): Observable<any>{
    return this.httpclient.get(`${this.REST_API}/raw/api/v2/Assignment/War/801`, {
      headers: {
        'X-Super-Client': 'yemdivers-companion',
        'X-Super-Contact': 'alejandromorenodinu@gmail.com'
      }});
  }
  public getDispatches(): Observable<any>{
    return this.httpclient.get(`${this.REST_API}/api/v1/dispatches`, {
      headers: {
        'X-Super-Client': 'yemdivers-companion',
        'X-Super-Contact': 'alejandromorenodinu@gmail.com'
      }});
  }
  public getCampaigns(): Observable<any>{
    return this.httpclient.get(`${this.REST_API}/api/v1/campaigns`, {
      headers: {
        'X-Super-Client': 'yemdivers-companion',
        'X-Super-Contact': 'alejandromorenodinu@gmail.com'
      }}
    );
  }
  public getPlanetByIndex(index:number): Observable<any>{
    return this.httpclient.get(`${this.REST_API}/api/v1/planets/${index}`, {
      headers: {
        'X-Super-Client': 'yemdivers-companion',
        'X-Super-Contact': 'alejandromorenodinu@gmail.com'
      }}
    );
  }
}
