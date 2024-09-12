import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-Add-Bank',
  templateUrl: './Add-Bank.component.html',
  styleUrls: ['./Add-Bank.component.css']
})
export class AddBankComponent implements OnInit {

  AddBankForm!: FormGroup
  isLoading: any;
  constructor(private modalService: BsModalService,) { }

  ngOnInit() {
  }

  closeModal(): void {
    this.modalService.hide();
  }
  onSubmit(){

  }

  openDatepicker(){

  }
}
