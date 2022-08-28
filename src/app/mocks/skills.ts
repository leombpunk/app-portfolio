export interface Skills {
    id?: number;
    descripcion: string;
    nivel: number;
    seniority: string;
}

export class Skill { 
    id: number = 0;
    descripcion: string = "";
    nivel: number = 0;
    tipo_habilidad_id: number = 0;
    usuarios_id: number = 0;
}