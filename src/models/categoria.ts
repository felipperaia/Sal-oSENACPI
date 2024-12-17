import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Categoria")
export class Categoria {
  @PrimaryGeneratedColumn({ type: "int", name: "id_categoria" })
  id_categoria!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  desc_cat: string;

  constructor(desc_cat: string, id_categoria?: number) {
    if (id_categoria) this.id_categoria = id_categoria;
    this.desc_cat = desc_cat;
  }
}