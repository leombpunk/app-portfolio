// export interface Biography {
//     id?: number;
//     nombre: string;
//     apellido: string;
//     correo: string;
//     acercade: string;
//     titulo: string;
//     github: string;
//     linkedin: string;
//     foto: string;
//     usuarios_id?: number;
// }

export class Biography {
    id: number = 0;
    nombre: string = "";
    apellido: string = "";
    correo: string = "";
    acercade: string = "";
    titulo: string = "";
    github: string = "";
    linkedin: string = "";
    foto: string = "";
    foto_url: string = "";
    foto_public_id: string = ""; 
    usuarios_id: number = 0;
}