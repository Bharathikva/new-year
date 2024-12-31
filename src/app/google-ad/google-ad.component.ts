import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-ad',
  imports: [],
  template: `
    <div class="ad-container">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-xxxxxxxxxxxxxxx"
           data-ad-slot="xxxxxxxxxx"
           data-ad-format="auto"></ins>
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
