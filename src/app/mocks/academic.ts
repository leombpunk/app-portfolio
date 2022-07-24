export interface Academics {
    id?: number;
    usuarios_id: number;
    institucion: string;
    titulo: string;
    // locacion: string;
    habilidades: string[]; //agregar a la base de datos ¿sí o no?
    desde: string;
    hasta: string;
    logo: string;
}