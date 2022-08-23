export interface Experiences {
    id?: number;
    idUser: number;
    cargo: string;
    empresa: string;
    tareas: string[];
    desde: string;
    hasta: string;
    refe_per: string;
    refe_tel: string;
    foto: string;
}

export class Experience {
    id: number = 0;
    cargo: string = "";
    tarea: string[] = []; //en el get hacer el split y guardarlo en las tareas
    desde: string = "";
    hasta: string = "";
    logo: string = "";
    empresa: string = "";
    reftelef: string = "";
    refnombre: string = "";
    usuarios_id: number = 0;
}