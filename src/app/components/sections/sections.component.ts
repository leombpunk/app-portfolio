import { Component, OnInit } from '@angular/core';

import { Biography, Biography1 } from '../../mocks/biography';
// import { BIOGRAPHY } from '../../mocks/biography-mock';

import { Skills } from '../../mocks/skills';
import { SKILLS } from '../../mocks/skills-mock';

import { Projects } from '../../mocks/projects';
import { PROJECTS } from '../../mocks/projects-mock';

import { Academics } from '../../mocks/academic';
import { ACADEMICS } from '../../mocks/academic-mock';

import { Experiences, Experience } from '../../mocks/experience';
import { EXPERIENCES } from '../../mocks/experience-mock';

// import { Biography1 } from '../../mocks/prueba';
import { BiographyService } from 'src/app/services/biography.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { WalkietalkieService } from '../../services/walkietalkie.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  private urlImageApi: string = 'http://localhost:8080/images/';
  // private usuario_id: number = 0;
  // biography: Biography[] = BIOGRAPHY;
  skills: Skills[] = SKILLS;
  projects: Projects[] = PROJECTS;
  academics: Academics[] = ACADEMICS;
  // experiences: Experiences[] = EXPERIENCES;

  bio: Biography1 = {
    id: 0,
    nombre: '',
    apellido: '',
    acercade: '',
    correo: '',
    titulo: '',
    github: '',
    linkedin: '',
    foto: '',
    usuarios_id: 0
  };

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

  constructor(
    private serviceBio: BiographyService,
    private serviceExpe: ExperienceService,
    private comunicationService: WalkietalkieService
  ) {
      this.comunicationService.informarBio$.subscribe(
        (value: boolean) => { 
          // console.log('value: '+value);
          if (value){
            // console.log("dentro del if del servicio walkietalkie");
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
      )
  }

  ngOnInit(): void {
    this.LoadData();
    this.LoadDataExperience();
  }

  LoadData() {
    // console.log('bio.id1: ' + this.bio.id);
    this.serviceBio.getBiography().subscribe((bio: any) => {
      this.bio = bio;
      // console.log("bio: " + bio);
      this.bio.foto = this.urlImageApi + bio.foto;
      // console.log('bio git: ' + this.bio.github);
      // this.usuario_id = this.bio.usuarios_id;
      // console.log("seccion bio.usuarios_id: ");
      // console.log(this.bio.usuarios_id);
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

      // console.log("expe: ");
      // console.log(this.expe);
    })
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
}
