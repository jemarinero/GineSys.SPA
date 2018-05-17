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
    foto: string;
    numeroIdentidad: string;
    fechaUltMenstruacion: Date;
    estadoCivil: number;
    ocupacionId: number;
    nombreConyugue: string;
    ocupacionIdConyugue: number;
    religionId: number;
    aseguradoraId: number;
    grupoSanguineoId: number;
    observacion: string;
    edadMenarca: number;
    frecuenciaMenstrual: string;
    diasMenstruacion: number;
    cantidadMenstruacion: number;
    edadMenopausia: number;
    edadPrimeraRelacionSexual: number;
    isAlergica: boolean;
    medicamentosAlergica: string;
    hasCirugiaPrevia: boolean;
    cirugias: string;
    isPlanificando: boolean;
    metodoPlanificacion: string;
    fechaUltimaCitologia: Date;
    cantidadEmbarazos: number;
    cantidadHijosVivos: number;
    cantidadHijosMuertos: number;
    cantidadCesareas: number;
    cantidadPartosVaginales: number;
    cantidadObitos: number;
    cantidadEctopicos: number;
    cantidadMolas: number;
    cantidadAbortos: number;
    fechaUltimaCesarea: Date;
    fechaUltimoEmbarazo: Date;
    terminoUltimoEmbarazo: number;
    hasLegrados: boolean;

    constructor(init?: Partial<Paciente>) {
        Object.assign(this,init);
    }
}
