import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payments } from "./Payments";

@Index("pk_records", ["recordId"], { unique: true })
@Entity("records", { schema: "public" })
export class Records {
  @PrimaryGeneratedColumn({ type: "integer", name: "record_id" })
  recordId: number;

  @Column("date", { name: "record_date" })
  recordDate: string;

  @Column("numeric", { name: "record_morning", precision: 5, scale: 2 })
  recordMorning: string;

  @Column("numeric", { name: "record_afternoon", precision: 5, scale: 2 })
  recordAfternoon: string;

  @Column("text", { name: "record_description" })
  recordDescription: string;

  @ManyToOne(() => Payments, (payments) => payments.records, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "payment_id", referencedColumnName: "paymentId" }])
  payment: Payments;
}
