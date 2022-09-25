export interface Projects {
    id?: number;
    idUser: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    enlaceRepo: string;
    enlaceDemo: string;
    foto: string;
}

export class Project {
    id: number = 0;
    usuarios_id: number = 0;
    nombre: string = "";
    descripcion: string = "";
    desde: string = "";
    hasta: string = "";
    enlace: string = "";
    sitio: string = "";
    logo: string = "";
}