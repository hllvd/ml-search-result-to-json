import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm"

/**
 * @description
 */

@Entity({
  engine: "InnoDB",
})
@Unique(["searchTerm"])
export class Search {
  @PrimaryGeneratedColumn()
  id?: number

  @PrimaryColumn({ type: "varchar", unique: true })
  searchTerm: string

  @Column({ type: "varchar" })
  url: string

  @Column({ type: "varchar", nullable: true })
  categoryId: string

  @UpdateDateColumn({ type: "datetime" })
  metadataUpdatedAt: Date
}
