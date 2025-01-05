import {
  Column,
  Entity,
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
@Unique(["searchTerm"])
export class Search {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn({ type: "varchar" })
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
