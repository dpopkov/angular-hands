import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  pageRequested = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  onPageChange(page: number): void {
    this.pageRequested = page;
    console.log('Changed page to', this.pageRequested);
  }

}
