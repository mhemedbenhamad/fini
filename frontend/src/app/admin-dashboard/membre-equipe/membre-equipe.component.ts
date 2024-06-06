import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../membre.service';
import { BackendService } from '../../user.data.service';
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

  constructor(
    private teamMemberService: TeamMemberService, 
    private backendService: BackendService,
    private formBuilder: FormBuilder
  ) {
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

  updateMemberRole(member: any): void {
    const role = member.role; // Récupérer le nouveau rôle du membre
    const userId = member.login_id_log; // Utiliser l'ID de connexion comme ID utilisateur

    this.backendService.updateUserRole(userId, role).subscribe(
      () => {
        console.log('Role updated successfully');
        this.getAllTeamMembers(); // Actualiser la liste des membres
      },
      error => {
        console.log('Error updating role:', error);
      }
    );
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

  showAddForm(): void {
    this.isAddFormVisible = true;
    this.isEditFormVisible = false;
  }

  cancelAdd(): void {
    this.isAddFormVisible = false;
    this.memberForm.reset();
  }

  cancelEdit(): void {
    this.isEditFormVisible = false;
    this.selectedMember = null;
    this.memberForm.reset();
  }
}
