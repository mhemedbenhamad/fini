import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-member-dashboard',
  templateUrl: './team-member-dashboard.component.html',
  styleUrls: ['./team-member-dashboard.component.css']
})
export class TeamMemberDashboardComponent implements OnInit {

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
