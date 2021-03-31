import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cows } from "./Cows";
import { Payments } from "./Payments";
import { Purchases } from "./Purchases";

@Index("pk_users", ["userId"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "user_id" })
  userId: number;

  @Column("character varying", { name: "user_email", length: 50 })
  userEmail: string;

  @Column("character varying", { name: "user_name", length: 20 })
  userName: string;

  @Column("character varying", { name: "user_password", length: 200 })
  userPassword: string;

  @OneToMany(() => Cows, (cows) => cows.user)
  cows: Cows[];

  @OneToMany(() => Payments, (payments) => payments.user)
  payments: Payments[];

  @OneToMany(() => Purchases, (purchases) => purchases.user)
  purchases: Purchases[];

  hashPassword(): void {
    const salt = genSaltSync(10);
    this.userPassword = hashSync(this.userPassword, salt);
  }

  checkPassword(password: string): boolean {
    return compareSync(password, this.userPassword);
  }

  checkPasswordSimple(password: string): boolean {
    return password == this.userPassword;
  }


}
