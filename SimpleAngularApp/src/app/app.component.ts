import {Component, OnInit, ViewChild} from '@angular/core';
import {FooterComponent} from "./footer/footer.component";
import {Page2Component} from "./page2/page2.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SimpleAngularApp';

  @ViewChild('footer')
  footerComponent: FooterComponent;
  @ViewChild('page2Component')
  page2Component: Page2Component;

  startTime: string;

  currentPage = 1;

  ngOnInit(): void {
    this.startTime = new Date().toString();
  }

  updateLastAccessed(): void {
    console.log('Button "Update last accessed" was clicked');
    console.log('The previous last accessed was', this.footerComponent.lastAccessed)
    let lastAccessed = new Date().toString();
    this.footerComponent.lastAccessed = lastAccessed;
    console.log('lastAccessed updated to', lastAccessed)
  }

  incrementHitCounter(page: number): void {
    this.currentPage = page;
    if (page === 2) {
      this.page2Component.incrementHitCounter();
    }
  }
}
