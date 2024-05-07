import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../membre.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-equipe',
  templateUrl: './membre-equipe.component.html',
  styleUrls: ['./membre-equipe.component.css']
})
export class MembreEquipeComponent implements OnInit {
  isAddFormVisible: boolean = false;
  isEditFormVisible: boolean = false;
  members: any[] = [];
  memberForm: FormGroup;
  selectedMember: any;

  constructor(private teamMemberService: TeamMemberService, private formBuilder: FormBuilder) {
    this.memberForm = this.formBuilder.group({
      Id_Mem_Eq: [''],
      Nom_Mem_Eq: ['', Validators.required],
      Pren_Mem_Eq: ['', Validators.required],
      Adr_Mem_Eq: ['', Validators.required],
      Email_Mem_Eq: ['', [Validators.required, Validators.email]],
      Tel_Mem_Eq: ['', Validators.required],
      Poste_Mem_eq: ['', Validators.required],
      login_id_log: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllTeamMembers();
  }

  getAllTeamMembers(): void {
    this.teamMemberService.getAllTeamMembers().subscribe(
      (data: any[]) => {
        this.members = data;
      },
      error => {
        console.log('Error fetching team members:', error);
      }
    );
  }

  addTeamMember(): void {
    if (this.memberForm.valid) {
      this.teamMemberService.addTeamMember(this.memberForm.value).subscribe(
        () => {
          this.getAllTeamMembers();
          this.memberForm.reset();
          this.isAddFormVisible = false;
        },
        error => {
          console.log('Error adding team member:', error);
        }
      );
    }
  }

  selectMember(member: any): void {
    this.selectedMember = member;
    this.memberForm.patchValue(member);
    this.isEditFormVisible = true;
    this.isAddFormVisible = false;
  }

  updateTeamMember(): void {
    if (this.memberForm.valid && this.selectedMember) {
      const memberId = this.selectedMember.Id_Mem_Eq;
      this.teamMemberService.updateTeamMember(memberId, this.memberForm.value).subscribe(
        () => {
          this.getAllTeamMembers();
          this.memberForm.reset();
          this.selectedMember = null;
          this.isEditFormVisible = false;
        },
        error => {
          console.log('Error updating team member:', error);
        }
      );
    }
  }

  deleteTeamMember(memberId: number): void {
    this.teamMemberService.deleteTeamMember(memberId).subscribe(
      () => {
        this.getAllTeamMembers();
      },
      error => {
        console.log('Error deleting team member:', error);
      }
    );
  }
  
  // Méthode pour afficher le formulaire d'ajout
  showAddForm() {
    this.memberForm.reset(); // Réinitialiser le formulaire avant de l'afficher
    this.isAddFormVisible = true;
    this.isEditFormVisible = false;
  }

   // Méthode pour annuler l'ajout
   cancelAdd(): void {
    this.memberForm.reset(); // Réinitialiser le formulaire
    this.isAddFormVisible = false; // Masquer le formulaire d'ajout
  }

  // Méthode pour annuler la modification
  cancelEdit(): void {
    this.memberForm.reset(); // Réinitialiser le formulaire
    this.selectedMember = null; // Réinitialiser le membre sélectionné
    this.isEditFormVisible = false; // Masquer le formulaire de modification
  }

}
