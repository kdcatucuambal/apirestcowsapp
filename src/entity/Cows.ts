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
import { Observations } from "./Observations";

@Index("pk_cows", ["cowId"], { unique: true })
@Entity("cows", { schema: "public" })
export class Cows {
  @PrimaryGeneratedColumn({ type: "integer", name: "cow_id" })
  cowId: number;

  @Column("character varying", { name: "cow_name", length: 50 })
  cowName: string;

  @Column("character varying", { name: "cow_race", length: 20 })
  cowRace: string;

  @Column("date", { name: "cow_birth_date" })
  cowBirthDate: string;

  @Column("date", { name: "cow_buy_date" })
  cowBuyDate: string;

  @Column("numeric", { name: "cow_price", precision: 7, scale: 2 })
  cowPrice: string;

  @Column("text", { name: "cow_description" })
  cowDescription: string;

  @Column("text", { name: "cow_image", nullable: true })
  cowImage: string | null;

  @ManyToOne(() => Users, (users) => users.cows, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => Observations, (observations) => observations.cow)
  observations: Observations[];
}
