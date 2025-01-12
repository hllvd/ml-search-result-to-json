import {
  Column,
  ColumnTypeUndefinedError,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm"
import { SearchPosition } from "./search-positions.entity"

/**
 * @description
 */

@Entity({
  engine: "InnoDB",
})
@Unique(["searchTerm", "url"])
export class Search {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar" })
  searchTerm: string

  @Column({ type: "varchar" })
  url: string

  @Column({ type: "varchar", nullable: true })
  categoryId?: string

  @OneToMany(() => SearchPosition, (sp) => sp.search, {
    cascade: true,
  })
  searchPosition?: SearchPosition[] | null

  @UpdateDateColumn({ type: "datetime" })
  metadataUpdatedAt: Date
}
