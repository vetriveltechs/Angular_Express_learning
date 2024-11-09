import { ApiService } from './../api.service';


import { Amplify } from 'aws-amplify';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products:any[]=[];

  // constructor(private apiservice :ApiService){}

  // ngOnInit(): void {
  //   this.apiservice.getProducts().subscribe(


  //     arg => {
  //       console.log("Api Response" + arg);
  //       this.products = arg.product});

  // }

}
