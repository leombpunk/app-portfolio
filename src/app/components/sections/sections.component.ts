import { Component, OnInit } from '@angular/core';

import { Skills } from '../../mocks/skills';
import { SKILLS } from '../../mocks/skills-mock';

import { Projects } from '../../mocks/projects';
import { PROJECTS } from '../../mocks/projects-mock';

import { Biography1 } from '../../mocks/biography';
import { Academics } from '../../mocks/academic';
import { Experience } from '../../mocks/experience';
import { Project } from '../../mocks/projects';
import { BiographyService } from 'src/app/services/biography.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { AcademicService } from '../../services/academic.service';
import { ProjectService } from '../../services/project.service';
import { WalkietalkieService } from '../../services/walkietalkie.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  private urlImageApi: string = 'http://localhost:8080/images/';

  skills: Skills[] = SKILLS;

  bio: Biography1 = new Biography1();

  expe: Experience[] = [{
    id: 0,
    cargo: '',
    tarea: [],
    desde: '',
    hasta: '',
    logo: "",
    empresa: "",
    reftelef: "",
    refnombre: "",
    usuarios_id: 0
  }];

  academ: Academics[] = [{
    id: 0,
    usuarios_id: 0,
    institucion: "",
    titulo: "",
    locacion: "",
    habilidades: [],
    desde: "",
    hasta: "",
    logo: "",
    usuario_id: 0
  }];

  // testeando
  projects: Project[] = new Array<Project>();

  constructor(
    private serviceBio: BiographyService,
    private serviceExpe: ExperienceService,
    private serviceAcadm: AcademicService,
    private serviceProject: ProjectService,
    private comunicationService: WalkietalkieService
  ) {
      this.comunicationService.informarBio$.subscribe(
        (value: boolean) => { 
          if (value){
            this.UpdateEvent();
          }
        }
      );

      this.comunicationService.informarExpe$.subscribe(
        (value: boolean) => {
          if (value){ 
            this.UpdateEventExpe();
          }
        }
      );

      this.comunicationService.informarAca$.subscribe(
        (value: boolean) => {
          if (value){
            this.UpdateEventAcadem();
          }
        }
      );

      this.comunicationService.informarProj$.subscribe(
        (value: boolean) => {
          if (value){
            this.UpdateEventProject();
          }
        }
      );
  }

  ngOnInit(): void {
    this.LoadData();
    this.LoadDataExperience();
    this.LoadDataAcademic();
    this.LoadDataProject();
    this.LoadDataSkill();
  }

  LoadData() {
    this.serviceBio.getBiography().subscribe((bio: any) => {
      this.bio = bio;
      this.bio.foto = this.urlImageApi + bio.foto;
      this.comunicationService.setUsuarioId(this.bio.usuarios_id);
    });
  }

  LoadDataExperience() {
    this.serviceExpe.getExperiences().subscribe((expe: any) => {
      expe.forEach((element: any) => {
        let esplitear: string[] = element.tarea.split(','); 
        // console.log(esplitear);
        element.tarea = esplitear;
        element.logo = this.urlImageApi + element.logo;
      });
      this.expe = expe;
    })
  }

  LoadDataAcademic(){
    this.serviceAcadm.getAcademics().subscribe((academ: any) => {
      academ.forEach((element: any) => {
        let esplitear: string[] = element.habilidades.split(','); 
        // console.log(esplitear);
        element.habilidades = esplitear;
        element.logo = this.urlImageApi + element.logo;
      });
      this.academ = academ;
    });
  }

  LoadDataSkill(){

  }

  LoadDataProject(){
    this.serviceProject.getProjects().subscribe((project: any) => {
      project.forEach((element: any) => {
        element.logo = this.urlImageApi + element.logo;
        // console.log("element: ");
        // console.log(element);
      });
      this.projects = project;
    });
  }

  UpdateEvent() {
    // console.log('update event');
    this.LoadData();
    this.comunicationService.actualiceBio(false);
  }

  UpdateEventExpe(){
    this.LoadDataExperience();
    this.comunicationService.actualiceExpe(false);
  }

  UpdateEventAcadem(){
    this.LoadDataAcademic();
    this.comunicationService.actualiceAca(false);
  }

  UpdateEventProject(){
    this.LoadDataProject();
    this.comunicationService.actualiceProj(false);
  }
}
