export interface Ocupacion {
    id: number;
    descripcion: string;
    usuarioCreacion: string;
    fechaCreacion: Date;
    usuarioModificacion?: string;
    fechaModificacion?: Date;
}