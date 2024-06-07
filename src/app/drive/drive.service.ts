import { Injectable } from '@angular/core';
import { Drive } from '../shared/models/drive';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  drives: Drive[] = [];

  constructor() { }

  addDrive(drive: Drive) {
    this.drives.push(drive);
  }

  getDrives() {
    return this.drives;
  }

  getDrivesById(id: string) {
    return this.drives.find(x => x.id === id);
  }
}
