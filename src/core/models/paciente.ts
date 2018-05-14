import * as moment from 'moment';

export class Paciente {
    id: number;
    nombre: string;
    direccion: string;
    fechaNacimiento: Date;
    edad: number;
    telefono: string;
    correo: string;
    estado: boolean;
    meses: number;
    dias: number;
    hasSeguroMedico: boolean;

    constructor(init?: Partial<Paciente>) {
        Object.assign(this,init);
    }
}
