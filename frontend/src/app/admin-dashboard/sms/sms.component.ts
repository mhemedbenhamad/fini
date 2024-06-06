import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {
  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Progression',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };
  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjectSteps(1); // Remplacez par l'ID du projet
  }

  loadProjectSteps(projectId: number) {
    this.projectService.getProjectDetails(projectId).subscribe(projectDetails => {
      const projectSteps = [
        { step: 'Étude', completed: projectDetails.etudes.length > 0 ? 100 : 0 },
        { step: 'Dépouillement', completed: projectDetails.depouillement.length > 0 ? 100 : 0 },
        { step: 'Entreprise de Conseil', completed: projectDetails.entreprise_cons.length > 0 ? 100 : 0 },
        { step: 'Suivi', completed: projectDetails.suivi.length > 0 ? 100 : 0 },
        { step: 'Réglementation', completed: projectDetails.reglement_defin.length > 0 ? 100 : 0 }
      ];

      this.chartData = {
        labels: projectSteps.map(step => step.step),
        datasets: [
          {
            label: 'Progression',
            data: projectSteps.map(step => step.completed),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    });
  }
}
