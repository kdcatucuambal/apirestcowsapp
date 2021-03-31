import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Items } from "./Items";

@Index("pk_products", ["productId"], { unique: true })
@Entity("products", { schema: "public" })
export class Products {
  @PrimaryGeneratedColumn({ type: "integer", name: "product_id" })
  productId: number;

  @Column("text", { name: "product_name" })
  productName: string;

  @Column("numeric", { name: "product_common_price", precision: 7, scale: 2 })
  productCommonPrice: string;

  @OneToMany(() => Items, (items) => items.product)
  items: Items[];
}
