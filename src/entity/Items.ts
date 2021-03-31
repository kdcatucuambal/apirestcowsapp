import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";
import { Purchases } from "./Purchases";

@Index("pk_items", ["itemId"], { unique: true })
@Entity("items", { schema: "public" })
export class Items {
  @PrimaryGeneratedColumn({ type: "integer", name: "item_id" })
  itemId: number;

  @Column("numeric", { name: "item_price", precision: 7, scale: 2 })
  itemPrice: string;

  @Column("numeric", { name: "item_quantity", precision: 7, scale: 2 })
  itemQuantity: string;

  @Column("numeric", { name: "item_subtotal", precision: 7, scale: 2 })
  itemSubtotal: string;

  @ManyToOne(() => Products, (products) => products.items, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Products;

  @ManyToOne(() => Purchases, (purchases) => purchases.items, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "purchase_id", referencedColumnName: "purchaseId" }])
  purchase: Purchases;
}
