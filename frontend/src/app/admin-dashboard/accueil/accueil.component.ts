import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { BackendService } from '../../user.data.service';
import { SuiviService } from '../../suivi.service';
import Chart from 'chart.js/auto';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  countProjects: number = 0;
  delayedProjectsCount: number = 0;
  delayedProjects: any[] = [];
  userCount: number = 0;
  suiviData: any[] = [];
  progressBarHeight: number = 4;
  projectsByYear: any[] = [];
  maxProjectCount: number = 0;
  barChart?: Chart;
  doughnutChart?: Chart;

  constructor(
    private projectService: ProjectService,
    private backendService: BackendService,
    private suiviService: SuiviService
  ) {}

  ngOnInit(): void {
    this.getProjectCount();
    this.loadUserCount();
    this.loadSuiviData();
    this.loadProjectsByYear();
    this.loadDelayedProjectsCount();
  }

  getProjectCount(): void {
    this.projectService.getProjectCount().subscribe(
      (data) => {
        this.countProjects = data.count;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  loadUserCount(): void {
    this.backendService.countUsers().subscribe(
      (result) => {
        this.userCount = result.userCount;
      },
      (error) => {
        if (error.status === 401) {
          // Gérer l'erreur Unauthorized ici
          console.error('Unauthorized error:', error);
          // Par exemple, vous pouvez rediriger l'utilisateur vers une page de connexion
          // ou afficher un message d'erreur approprié
        } else {
          // Gérer les autres erreurs HTTP ici
          console.error('An error occurred while fetching user count:', error);
        }
      }
    );
  }
  
  

  loadSuiviData(): void {
    this.suiviService.getSuiviWithProject().subscribe(
      (data) => {
        this.suiviData = data;
      },
      (error) => {
        console.error('An error occurred while fetching suivi data:', error);
      }
    );
  }

  calculateProjectLength(startDate: string, endDate: string, suiviDate: string): number {
    if (!startDate || !endDate) {
      return 0;
    }

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const suivi = new Date(suiviDate).getTime();

    if (suivi <= start) {
      return 0;
    } else if (suivi >= end) {
      return 100;
    } else {
      return ((suivi - start) / (end - start)) * 100;
    }
  }

  calculateSuiviPosition(startDate: string, endDate: string, suiviDate: string): number {
    if (!startDate || !endDate || !suiviDate) {
      return 0;
    }

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const suivi = new Date(suiviDate).getTime();

    if (suivi <= start) {
      return 0;
    } else if (suivi >= end) {
      return 100;
    } else {
      return ((suivi - start) / (end - start)) * 100;
    }
  }

  loadProjectsByYear(): void {
    this.projectService.getProjectCountByYear().subscribe(
      (data) => {
        this.projectsByYear = data.map(item => {
          return {
            year: item.year,
            count: item.projectCount
          };
        });
        this.createBarChart();
      },
      (error) => {
        console.error('An error occurred while fetching projects by year:', error);
      }
    );
  }

  loadDelayedProjectsCount(): void {
    this.projectService.getDelayedProjectsCount().subscribe(
      (data) => {
        this.delayedProjects = data;
        this.delayedProjectsCount = data.reduce((total, item) => total + item.Nb_Projets_Retard, 0);
        if (this.countProjects > 0) {
          this.createDoughnutChart(this.delayedProjectsCount, this.countProjects);
        }
      },
      (error) => {
        console.error('An error occurred while fetching delayed projects count:', error);
      }
    );
  }

  createBarChart(): void {
    const years = this.projectsByYear.map(item => item.year);
    const counts = this.projectsByYear.map(item => item.count);
  
    const colors = [
      '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff',
      '#ff9f40', '#ffcd56', '#ff6384', '#36a2eb', '#4bc0c0'
    ];
  
    const canvas = document.getElementById('projectsByYearChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('Canvas context is null.');
      return;
    }
  
    const maxCount = Math.max(...counts); // Trouver la valeur maximale dans les données de comptage
    const yMax = Math.ceil(maxCount + 3)  ; // Arrondir à la dizaine supérieure et ajouter 30
  
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [{
          label: 'Projects',
          data: counts,
          backgroundColor: colors.slice(0, counts.length),
          borderColor: colors.slice(0, counts.length),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: yMax, // Définir la hauteur maximale de l'axe y
            title: {
              display: true,
              text: 'Number of Projects',
              font: {
                weight: 'bold'
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year',
              font: {
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Projects by Year',
            font: {
              size: 20,
              weight: 'bold'
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
  }
  
  createDoughnutChart(delayedProjectsCount: number, totalProjectsCount: number): void {
    const canvas = document.getElementById('delayedProjectsChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('Canvas context is null.');
      return;
    }
  
    const delayedPercentage = Number((delayedProjectsCount / totalProjectsCount * 100).toFixed(0));
    const onTimePercentage = 100 - delayedPercentage;
  
    this.doughnutChart = new Chart(ctx, {
      type: 'doughnut' as ChartType,
      data: {
        labels: ['Projects retard', 'Projects dans le temp'],
        datasets: [{
          label: 'Projects',
          data: [delayedPercentage  , onTimePercentage],
          backgroundColor: ['#ff6384', '#36a2eb'],
          borderColor: ['#ff6384', '#36a2eb'],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Retard Projects Percentage',
            font: {
              size: 20,
              weight: 'bold'
            }
          },
          legend: {
            display: true
          }
        }
      }
    });
  }
  
  
}
