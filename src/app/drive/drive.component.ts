import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DriveService } from './drive.service';
import { Drive } from '../shared/models/drive';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})
export class DriveComponent implements OnInit {
  drives: Drive[] = [];

  displayedColumns: string[] = [
    "id",
    "startAddress",
    "endAddress",
    "price",
    "date",
    "phone",
    "payingMethod",
    "cardNumber",
    "expiryDate"
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private router: Router,
    private driveService: DriveService
  ) {}

  ngOnInit(): void {
    const drives = this.driveService.getDrives();
    this.dataSource = new MatTableDataSource(drives);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  navigateToAdd(): void {
    this.router.navigate(['/driveForm']);
  }

  onRowClick(row: any) {
    this.router.navigate(['/details', row.id]);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
