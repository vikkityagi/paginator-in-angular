import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'city_name'];
  dataSource = new MatTableDataSource<any>([]);
  pageSize = 5;
  currentPage = 0;
  totalItems = 0;
  allData: any[] = [];



  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.service.getStaticData().subscribe({
      next: data => {
        console.log(data)
        this.allData = data;
        this.totalItems = data.length;
        this.updateTableData();
       
      },
      error: error => {
        console.log(error);
      }
    });
  }

  

  // Get paginated data
  updateTableData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.allData.slice(startIndex, endIndex);
  }

  // Handle page change (next/prev buttons or any pagination controls)
  onPageChange(page: number): void {
    if (page >= 0 && page * this.pageSize < this.totalItems) {
      this.currentPage = page;
      this.updateTableData();
    }
  }

}
