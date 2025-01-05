import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm"
import { ProductsCatalogs } from "./products-catalogs.entity"
import { Search } from "./search.entity"

/**
 * @description
 */
//@Index("IDX_CUSTOM_INDEX", ["search", "position", "productId"])
@Entity({
  engine: "InnoDB",
})
@Unique(["search", "position", "productId"])
export class SearchPosition {
  @ManyToOne(() => Search, (search) => search, {
    nullable: true,
  })
  @JoinColumn()
  search: Search | null

  @PrimaryColumn({ type: "integer" })
  position: number

  @PrimaryColumn({ type: "varchar" })
  productId: string

  @UpdateDateColumn({ type: "datetime" })
  metadataUpdatedAt: Date
}
