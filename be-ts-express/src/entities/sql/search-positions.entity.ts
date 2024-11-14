import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"

/**
 * @description
 */

@Index("IDX_CUSTOM_INDEX", ["searchId", "position", "productId"])
@Entity({
  engine: "InnoDB",
})
export class SearchPosition {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar" })
  searchId: string

  @Column({ type: "integer" })
  position: number

  @Column({ type: "varchar" })
  productId: string

  @CreateDateColumn()
  createdAt: Date
}
