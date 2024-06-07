import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriveService } from '../drive.service';
import * as moment from "moment";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-drive-form',
  templateUrl: './drive-form.component.html',
  styleUrls: ['./drive-form.component.css']
})
export class DriveFormComponent implements OnInit {
  driveForm: FormGroup;
  id: string;
  cardShow = false;

  payingMethod: string[] = [
    "Cash",
    "Card"
  ];

  constructor(
    private driveService: DriveService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.checkCardPayingMethod();
  }

  initForm() {
    this.driveForm = new FormGroup({
      startAddress: new FormControl("", Validators.required),
      endAddress: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      hours: new FormControl("", [Validators.required, Validators.min(0), Validators.max(23)]),
      minutes: new FormControl("", [Validators.required, Validators.min(0), Validators.max(59)]),
      phone: new FormControl("", Validators.required),
      payingMethod: new FormControl("", Validators.required),
      cardNumber: new FormControl(""),
      expiryDate: new FormControl("")
    });
  }

  onSubmit() {
    const date = this.driveForm.get('date')?.value;

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = this.driveForm.get('hours')?.value;
    const minutes = this.driveForm.get('minutes')?.value;

    const specificDate = new Date(year, month, day, hours, minutes, 0);

    const parsedDate = moment(specificDate);
    const formattedDate = parsedDate.format('Do MMMM YYYY, h:mm:ss');


    let drive = this.driveForm.value;


    const uuid = uuidv4(); // Generate a v4 UUID
    drive.id = uuid;



    const randomNumber = Math.floor(Math.random() * 10001);
    drive.price = randomNumber.toFixed(2);

    drive.date = formattedDate;

    if (drive.payingMethod === "Card") {
      const expiryDate = moment(drive.expiryDate);
      const formattedExpiryDate = expiryDate.format('Do MMMM YYYY');
      drive.expiryDate = formattedExpiryDate;
    }

    this.driveService.addDrive(drive);

    this.router.navigateByUrl("");
  }

  onCancel() {
    this.router.navigateByUrl("");
  }

  private checkCardPayingMethod() {
    this.driveForm.get('payingMethod').valueChanges.subscribe(value => {
      const cardNumberControl = this.driveForm.get('cardNumber');
      const expiryDateControl = this.driveForm.get('expiryDate');

      if (value === "Card") {
        this.cardShow = true;
        cardNumberControl.setValidators([Validators.required]);
        expiryDateControl.setValidators([Validators.required]);
      }
      else {
        this.cardShow = false;
        cardNumberControl.clearValidators();
        expiryDateControl.clearValidators();

        cardNumberControl.setValue("");
        expiryDateControl.setValue("");
      }

      cardNumberControl.updateValueAndValidity();
      expiryDateControl.updateValueAndValidity();
    });
  } 
  
}
