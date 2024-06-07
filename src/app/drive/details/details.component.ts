import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriveService } from '../drive.service';
import { Drive } from 'src/app/shared/models/drive';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: string;
  drive: Drive;

  constructor(
    private route: ActivatedRoute,
    private driveService: DriveService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      if(this.id) {
        this.drive = this.driveService.getDrivesById(this.id);
      }
    });
  }

  onBack() {
    this.router.navigate(['']);
  }
}
