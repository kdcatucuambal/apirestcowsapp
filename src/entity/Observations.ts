import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cows } from "./Cows";
import { TypesObservations } from "./TypesObservations";

@Index("pk_observations", ["observationId"], { unique: true })
@Entity("observations", { schema: "public" })
export class Observations {
  @PrimaryGeneratedColumn({ type: "integer", name: "observation_id" })
  observationId: number;

  @Column("date", { name: "observation_date" })
  observationDate: string;

  @Column("text", { name: "observation_description" })
  observationDescription: string;

  @Column("numeric", { name: "observation_price", precision: 7, scale: 2 })
  observationPrice: string;

  @ManyToOne(() => Cows, (cows) => cows.observations, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "cow_id", referencedColumnName: "cowId" }])
  cow: Cows;

  @ManyToOne(
    () => TypesObservations,
    (typesObservations) => typesObservations.observations,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "type_id", referencedColumnName: "typeId" }])
  type: TypesObservations;
}
