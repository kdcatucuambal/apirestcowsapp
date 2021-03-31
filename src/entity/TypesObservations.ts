import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Observations } from "./Observations";

@Index("pk_types_observations", ["typeId"], { unique: true })
@Entity("types_observations", { schema: "public" })
export class TypesObservations {
  @PrimaryGeneratedColumn({ type: "integer", name: "type_id" })
  typeId: number;

  @Column("character varying", { name: "type_name", length: 20 })
  typeName: string;

  @OneToMany(() => Observations, (observations) => observations.type)
  observations: Observations[];
}
