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
@Unique(["search", "position", "product"])
@Entity({
  engine: "InnoDB",
})
export class SearchPosition {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Search, (search) => search)
  @JoinColumn()
  search: Search | null

  @Column({ type: "integer" })
  position: number

  @OneToOne(() => ProductsCatalogs, (pc) => pc, {
    cascade: true,
  })
  @JoinColumn()
  product: ProductsCatalogs | null

  @UpdateDateColumn({ type: "datetime" })
  metadataUpdatedAt: Date
}
