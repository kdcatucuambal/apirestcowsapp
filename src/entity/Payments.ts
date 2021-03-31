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

  @Column("date", { name: "payment_date", nullable: true })
  paymentDate: string | null;

  @Column("date", { name: "payment_to_date", nullable: true })
  paymentToDate: string | null;

  @Column("date", { name: "payment_from_date", nullable: true })
  paymentFromDate: string | null;

  @Column("numeric", {
    name: "payment_total_liters",
    nullable: true,
    precision: 7,
    scale: 2,
  })
  paymentTotalLiters: string | null;

  @Column("numeric", {
    name: "payment_liter_value",
    nullable: true,
    precision: 4,
    scale: 2,
  })
  paymentLiterValue: string | null;

  @Column("numeric", {
    name: "payment_total",
    nullable: true,
    precision: 7,
    scale: 2,
  })
  paymentTotal: string | null;

  @Column("boolean", { name: "purchase_active" })
  purchaseActive: boolean;

  @ManyToOne(() => Users, (users) => users.payments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => Records, (records) => records.payment)
  records: Records[];
}
