import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service'; // Import ProjectService

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  projectCount: number = 0; // Define projectCount variable

  constructor(private projectService: ProjectService) {} // Inject ProjectService

  ngOnInit(): void {
    this.loadProjectCount(); // Call loadProjectCount() when component initializes
  }

  loadProjectCount(): void {
    this.projectService.getProjectCount().subscribe(result => {
      this.projectCount = result.count; // Assuming the count is returned as 'count' property
    });
  }
}
