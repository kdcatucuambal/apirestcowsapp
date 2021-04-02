import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("pk_temp_record", ["tempRecordId"], { unique: true })
@Entity("temp_record", { schema: "public" })
export class TempRecord {
  @PrimaryGeneratedColumn({ type: "integer", name: "temp_record_id" })
  tempRecordId: number;

  @Column("date", { name: "temp_record_date" })
  tempRecordDate: string;

  @Column("numeric", {
    name: "temp_record_morning",
    precision: 5,
    scale: 2,
    default: () => "0",
  })
  tempRecordMorning: string;

  @Column("numeric", {
    name: "temp_record_afternoon",
    precision: 5,
    scale: 2,
    default: () => "0",
  })
  tempRecordAfternoon: string;

  @Column("text", { name: "temp_record_description" })
  tempRecordDescription: string;

  @ManyToOne(() => Users, (users) => users.tempRecords, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
