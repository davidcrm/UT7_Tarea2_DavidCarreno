export interface Alumno{
    id: number,
    nombre:    string;
    matricula: number;
    sexo:      Sexo;
    email:     null | string;
    repetidor: boolean;
    activo:    boolean;
}

export enum Sexo {
    F = "F",
    M = "M",
}
