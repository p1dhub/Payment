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
  getNumber: any = null;
  getName: any = null;
  getExp:any=null;
  
  cardNumber: string = "#### #### #### ####";
  cardHolder: string = "Name";
  cardExp: string = "##/##";
  cardCVV: any = null;
  setCardNumber() {
    if (isNaN(this.getNumber)) {
      this.cardNumber = "#### #### #### ####";
      this.getNumber = null;
    }
    else {
      this.cardNumber = this.getNumber.replace(/(.{4})/g, '$1 ').trim();
    }
  }

  setCVV() {
    if (isNaN(this.cardCVV)) {
      this.cardCVV = null;
    }
  }
  setName() {
    let i: number = 0;
    let isStr = true;
    for (i = 0; i < this.getName.length; i++) {
      isStr = Boolean(this.getName.charAt(i).match(/[a-zA-Z]/))
    }
    if (isStr)
      this.cardHolder = this.getName;
    else{
      this.getName=null;
      this.cardHolder="Name";
    }

  }

  setExp(){
    let ExpTemp:string=this.getExp;
    this.cardExp = ExpTemp.substr(5,2)+'/'+ExpTemp.substr(2,2);
    console.log(this.cardExp);
    
  }
}
