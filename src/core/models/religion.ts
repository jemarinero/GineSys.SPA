export interface Religion {
    id: number;
    descripcion: string;
    usuarioCreacion: string;
    fechaCreacion: Date;
    usuarioModificacion?: string;
    fechaModificacion?: Date;
}