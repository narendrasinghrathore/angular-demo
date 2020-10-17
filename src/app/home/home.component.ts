import { Component, OnInit } from '@angular/core';
import { CoreService } from '../services/core.service';
import { forkJoin, of, timer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'angular-demo';

  dataSource = new MatTableDataSource([]);

  users = [];

  displayedColumns = ['id', 'title', 'user'];

  constructor(private coreService: CoreService, private router: Router) { }

  ngOnInit() {
    forkJoin(
      this.coreService.post(),
      this.coreService.users()
    ).subscribe((data: any) => {
      const [table, users] = data;
      this.dataSource.data = table;
      this.users = users;
    });
  }

  navigate(userId: number | string) {
    this.router.navigate(['user', userId])
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserName(id: string) {
    const user = this.users.find(user => user.id === id);
    return user && user.name || '?';
  }

}
