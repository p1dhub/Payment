import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('Expdate') Expdate?: ElementRef;
  @ViewChild('cardType') cardType?: ElementRef;
  @ViewChild('cardTypeBack') cardTypeB?: ElementRef;

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
  selectType: number =0 ;

  setCardNumber() {
    if (isNaN(this.getNumber)) {
      this.cardNumber = "#### #### #### ####";
      this.getNumber = null;
    }
    else {
      if(this.getNumber.substr(0,1)=='4'||this.getNumber.substr(0,1)=='5'){
        this.selectType=parseInt(this.getNumber.substr(0,1))-4;
        console.log(this.selectType);
        
        if(this.cardTypeB&&this.cardType){
        this.cardType.nativeElement.src = this.cardTypeArr[this.selectType]
        this.cardTypeB.nativeElement.src = this.cardTypeArr[this.selectType]
        }
      }
      else{
        this.cardNumber = "#### #### #### ####";
        this.getNumber = null;
      }
      
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
		  if(response==1)
			alert("Incorrect information")
          else if (response == 2)
            alert("This card has been added")
		  else if(response==3)
			alert("This card is already exist");
		  
		  location.reload();
        }
      );
    }
  }
}
