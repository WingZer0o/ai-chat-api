import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWTService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient, private jwtService: JWTService) {}

  public getAuthenticated(url: string): Observable<any> {
    return this.httpClient.get(url, this.getAuthHeaders());
  }

  public postAuthenticated(url: string, body: any): Observable<any> {
    return this.httpClient.post(url, body, this.getAuthHeaders());
  }

  public putAuthenticated(url: string, body: any): Observable<any> {
    return this.httpClient.put(url, body, this.getAuthHeaders());
  }

  public deleteAuthenticated(url: string): Observable<any> {
    return this.httpClient.delete(url, this.getAuthHeaders());
  }

  private getAuthHeaders(): object {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.jwtService.getToken()}`
      ),
    };
    return header;
  }
}
