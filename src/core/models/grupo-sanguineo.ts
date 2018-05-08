export interface GrupoSanguineo {
    id: number;
    descripcion: string;
    usuarioCreacion: string;
    fechaCreacion: Date;
    usuarioModificacion?: string;
    fechaModificacion?: Date;
}
