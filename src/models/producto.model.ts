import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() // Esto le dice a TypeORM: "Crea una tabla llamada 'producto'"
export class Producto {
    @PrimaryGeneratedColumn() // Crea un ID automático que aumenta solo (1, 2, 3...)
    id: number;

    @Column() // Crea una columna de texto
    nombre: string;

    @Column("float") // Crea una columna para números con decimales
    precio: number;

    @Column() // Crea una columna para números enteros
    stock: number;
}