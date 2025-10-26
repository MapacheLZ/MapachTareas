import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoraApiService {

  private apiUrl = 'https://worldtimeapi.org/api/timezone/America/Santiago';

  constructor(private http: HttpClient) {}

  obtenerHora(): Observable<Date> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => new Date(data.datetime))
    );
  }
}
