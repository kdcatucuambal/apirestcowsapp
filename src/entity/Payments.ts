import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Records } from "./Records";

@Index("pk_payments", ["paymentId"], { unique: true })
@Entity("payments", { schema: "public" })
export class Payments {
  @PrimaryGeneratedColumn({ type: "integer", name: "payment_id" })
  paymentId: number;

  @Column("date", { name: "payment_date" })
  paymentDate: string;

  @Column("date", { name: "payment_to_date" })
  paymentToDate: string;

  @Column("date", { name: "payment_from_date" })
  paymentFromDate: string;

  @Column("numeric", { name: "payment_total_liters", precision: 7, scale: 2 })
  paymentTotalLiters: string;

  @Column("numeric", { name: "payment_liter_value", precision: 4, scale: 2 })
  paymentLiterValue: string;

  @Column("numeric", { name: "payment_total", precision: 7, scale: 2 })
  paymentTotal: string;

  @ManyToOne(() => Users, (users) => users.payments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => Records, (records) => records.payment, { cascade: true })
  records: Records[];
}
