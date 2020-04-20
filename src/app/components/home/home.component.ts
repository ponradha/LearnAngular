import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todayDate = new Date();
  headerClass = 'user-list-header';
  usersList: any = [
    {
      name: 'Ponradha', email: 'ponradha@gmail.com', age: 30,
      gender: 'm', pan: 'bchpp5868b', mobile: '09994655830'
    },
    {
      name: 'mithra', email: 'mithu@gmail.com', age: 12,
      gender: 'f', pan: 'bchrm6136b', mobile: '+917871046590'
    },
    {
      name: 'ramu', email: 'ramu@gmail.com', age: 39,
      gender: 'm', pan: 'bcrmr1011h', mobile: '9943861913'
    },
    {
      name: 'Vinotha', email: 'vino@jucolabs.com', age: 25,
      gender: 'f', pan: 'dvkvk2402s', mobile: '+917304673055'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
