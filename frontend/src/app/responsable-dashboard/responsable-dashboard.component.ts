import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsable-dashboard',
  templateUrl: './responsable-dashboard.component.html',
  styleUrls: ['./responsable-dashboard.component.css']
})
export class ResponsableDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

}