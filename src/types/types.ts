export interface Alumno{
    matricula: number;
    nombre:    string;
    sexo:      Sexo;
    email:     null | string;
    repetidor: boolean;
    activo:    boolean;
}

export enum Sexo {
    F = "F",
    M = "M",
}
