export interface Aseguradora {
    id: number;
    nombre: string;
    direccion?: string;
    telefonoFijo?: string;
    fax?: string;
    telefonoMovil?: string;
    correo?: string;
    contacto?: string;
    usuarioCreacion: string;
    fechaCreacion?: Date;
    usuarioModificacion?: string;
    fechaModificacion?: Date;
}
