import {Component, ViewChild} from '@angular/core';
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SimpleAngularApp';

  @ViewChild('footer')
  footerComponent: FooterComponent;

  updateLastAccessed(): void {
    console.log('Button "Update last accessed" was clicked');
    console.log('The previous last accessed was', this.footerComponent.lastAccessed)
    let lastAccessed = new Date().toString();
    this.footerComponent.lastAccessed = lastAccessed;
    console.log('lastAccessed updated to', lastAccessed)
  }
}
