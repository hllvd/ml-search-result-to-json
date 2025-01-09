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
//@Index("IDX_CUSTOM_INDEX", ["search", "position", "product"])
@Entity({
  engine: "InnoDB",
})
@Unique(["search", "position", "product"])
export class SearchPosition {
  @ManyToOne(() => Search, (search) => search)
  @JoinColumn()
  search: Search | null

  @PrimaryColumn({ type: "integer" })
  position: number

  @OneToOne(() => ProductsCatalogs, (pc) => pc, {
    cascade: true,
  })
  @JoinColumn()
  product: ProductsCatalogs | null

  @UpdateDateColumn({ type: "datetime" })
  metadataUpdatedAt: Date
}
