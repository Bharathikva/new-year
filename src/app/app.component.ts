import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from "./countdown/countdown.component";
import { GoogleAdComponent } from "./google-ad/google-ad.component";
import { CelebrationComponent } from "./celebration/celebration.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    CountdownComponent,
    GoogleAdComponent,
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent {
  title = 'x-mas';

  isCelebrating = false;

  startCelebration() {
    this.isCelebrating = true;

    // Stop the celebration after 10 seconds
    setTimeout(() => {
      this.isCelebrating = false;
    }, 10000);
  }
}
