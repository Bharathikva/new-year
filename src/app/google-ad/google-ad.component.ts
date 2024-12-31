import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-ad',
  imports: [],
  template: `
     <div class="ad-container">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-4882959606926736"
           data-ad-slot="1234567890"
           data-ad-format="auto">
      </ins>
    </div>
  `,
  styleUrl: './google-ad.component.css'
})
export class GoogleAdComponent implements OnInit{
  ngOnInit(): void {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }
}
