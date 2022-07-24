import { Component, OnInit } from '@angular/core';

import { Biography, Biography1 } from '../../mocks/biography';
// import { BIOGRAPHY } from '../../mocks/biography-mock';

import { Skills } from '../../mocks/skills';
import { SKILLS } from '../../mocks/skills-mock';

import { Projects } from '../../mocks/projects';
import { PROJECTS } from '../../mocks/projects-mock';

import { Academics } from '../../mocks/academic';
import { ACADEMICS } from '../../mocks/academic-mock';

import { Experiences } from '../../mocks/experience';
import { EXPERIENCES } from '../../mocks/experience-mock';

// import { Biography1 } from '../../mocks/prueba';
import { BiographyService } from 'src/app/services/biography.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  private urlImageApi: string = 'http://localhost:8080/images/';
  // biography: Biography[] = BIOGRAPHY;
  skills: Skills[] = SKILLS;
  projects: Projects[] = PROJECTS;
  academics: Academics[] = ACADEMICS;
  experiences: Experiences[] = EXPERIENCES;

  bio: Biography1 = {
    id: 0,
    nombre: "",
    apellido: "",
    acercade: "",
    correo: "",
    titulo: "",
    github: "",
    linkedin: "",
    foto: "",
    usuarios_id: 0
  };

  constructor(private serviceBio: BiographyService) {
  }

  ngOnInit(): void {
    // console.log('bio.id1: ' + this.bio.id);
    // this.serviceBio.getBiography().subscribe((bio: any) => {
    //   this.bio = bio;
    //   // console.log("bio: " + bio);
    //   this.bio.foto = this.urlImageApi + bio.foto;
    //   console.log('bio git: ' + this.bio.github);
    // });
    this.LoadData();
  }

  LoadData(){
    console.log('bio.id1: ' + this.bio.id);
    this.serviceBio.getBiography().subscribe((bio: any) => {
      this.bio = bio;
      // console.log("bio: " + bio);
      this.bio.foto = this.urlImageApi + bio.foto;
      console.log('bio git: ' + this.bio.github);
    });
  }

  UpdateEvent(){
    this.LoadData();
  }
}
