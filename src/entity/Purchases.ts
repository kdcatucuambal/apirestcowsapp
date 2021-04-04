import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Items } from "./Items";
import { Users } from "./Users";

@Index("pk_purchases", ["purchaseId"], { unique: true })
@Entity("purchases", { schema: "public" })
export class Purchases {
  @PrimaryGeneratedColumn({ type: "integer", name: "purchase_id" })
  purchaseId: number;

  @Column("date", { name: "purchase_date" })
  purchaseDate: string;

  @Column("numeric", { name: "purchase_total", precision: 7, scale: 2 })
  purchaseTotal: string;

  @Column("text", { name: "purchase_description" })
  purchaseDescription: string;

  @Column("boolean", { name: "purchase_paid", default: () => "false" })
  purchasePaid: boolean;

  @OneToMany(() => Items, (items) => items.purchase, { cascade: true, onDelete: "CASCADE" })
  items: Items[];

  @ManyToOne(() => Users, (users) => users.purchases, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
