import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('Expdate') Expdate?: ElementRef;
  @ViewChild('cardType') cardType?: ElementRef;

  constructor(private httpClinet: HttpClient) { }

  ngOnInit(): void {
  }
  cardTypeArr: Array<string> = ["https://logodix.com/logo/1153460.png", "https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png"]
  getNumber: any = null;
  getName: any = null;
  getExp: any = null;

  cardNumber: string = "#### #### #### ####";
  cardHolder: string = "Name";
  cardExp: string = "##/##";
  cardCVV: any = null;
  selectType: string = '0';

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
    else {
      this.getName = null;
      this.cardHolder = "Name";
    }

  }

  setExp() {
    if (parseInt(this.getExp.substr(0, 2)) >= 20 && parseInt(this.getExp.substr(0, 2)) < 30) {
      let ExpTemp: string = this.getExp;
      this.cardExp = ExpTemp.substr(5, 2) + '/' + ExpTemp.substr(2, 2);
    }
    else {
      if (this.Expdate)
        this.Expdate.nativeElement.value = "";
      this.cardExp = "##/##"
    }

  }

  checkFill(): boolean {
    let booltemp: boolean = true;
    

    if (this.cardNumber.length === 0) {
      this.cardNumber = "#### #### #### ####";
      booltemp = false;
    } 
    else if((this.selectType == '1' && this.cardNumber.substr(0, 1) == '4' && this.cardNumber.length >= 16) ||
    (this.selectType == '0' && this.cardNumber.substr(0, 1) == '5' && this.cardNumber.length == 19)) {
      alert('Invalid card number or card type');
      this.cardNumber = "#### #### #### ####";
      this.getNumber=null;
      booltemp = false;
    }
    
    
    if (this.cardHolder.length === 0) {
      this.cardHolder = "Name"
      console.log('ch');
      
      booltemp = false;
    } 
    else {

      if (this.getName != null)
        this.cardHolder = this.getName.toString();
      else{ 
        alert('Please enter card holder');
        booltemp = false;
      }
       
    }


    if (this.cardExp == "##/##"){
      alert('Please choose Expire date');
      booltemp = false;

    }


    if (this.cardCVV == null){
      alert('Please enter CCV/CVV')
      booltemp = false;
    }


    return booltemp;
  }

  changeType() {
    if (this.cardType) {
      this.cardType.nativeElement.src = this.cardTypeArr[parseInt(this.selectType)]
      if(parseInt(this.selectType)==0){
        this.cardType.nativeElement.style.height="2cm";
        this.cardType.nativeElement.style.margin="0";

      }
      else if(parseInt(this.selectType)==1){
        this.cardType.nativeElement.style.height="1.5cm";
        this.cardType.nativeElement.style.margin="0.25cm auto";

      }
    }
  }

  submitClick() {
    if (this.checkFill()) {
      this.httpClinet.post<any>('http://localhost:3000/payment/add', {
        cNumber: this.cardNumber,
        cHolder: this.cardHolder,
        cExpire: this.cardExp,
        cCVV: this.cardCVV,
        cType: this.selectType
      }).subscribe(
        (response) => {
          if (response == 2){
            alert("Success")
            location.reload();
          }
        }
      );
    }
  }
}
