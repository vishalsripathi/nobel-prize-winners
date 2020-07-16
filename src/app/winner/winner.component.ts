import { Component, OnInit, ViewChild } from '@angular/core';
import { WinnersService } from '../winners.service';
import { WinnerResults } from '../winner-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css'],
})
export class WinnerComponent implements OnInit {
  data: WinnerResults[];
  displayedColumns: string[] = ['firstname', 'category', 'year', 'motivation'];
  dataSource = new MatTableDataSource<WinnerResults>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private service: WinnersService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllReports();
  }

  public getAllReports() {
    let response = this.service.winnersList();
    response.subscribe((report) => {
      this.dataSource.data = report;
      console.log(report);
    });
    console.log(this.dataSource);
  }

  sortDataSource(id: string, start: string) {
    this.dataSource.sort.sort(<any>{ id: id, start: start });
    this.dataSource.data.sort((a: any, b: any) => {
      if (a.createdDate < b.createdDate) {
        return -1;
      } else if (a.createdDate > b.createdDate) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
