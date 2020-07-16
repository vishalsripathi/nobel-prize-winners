import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WinnersInterface, WinnerResults } from './winner-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WinnersService implements OnInit {
  constructor(private http: HttpClient) {}

  public winnersList(): Observable<WinnerResults[]> {
    return this.http
      .get<{ prizes: WinnersInterface[] }>(
        'http://api.nobelprize.org/v1/prize.json'
      )
      .pipe(
        map((data) => {
          const results: WinnerResults[] = [];
          data.prizes.forEach((prizes) => {
            if (prizes.laureates && prizes.laureates.length > 0) {
              prizes.laureates.map((l) => {
                results.push({
                  firstname: l.firstname,
                  id: l.id,
                  motivation: l.motivation.slice(1, -1),
                  surname: l.surname,
                  category: prizes.category,
                  year: prizes.year,
                });
              });
            }
          });
          return results;
        })
      );
  }

  ngOnInit() {}
}
