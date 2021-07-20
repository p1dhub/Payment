import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  cardNumber:string="0000 0000 0000 0000";
  cardHolder:string="Name"
  cardExp:string="Name"

}
