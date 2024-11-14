import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import {
  StateFieldSubType,
  StateFieldType,
} from "../../enums/state-field-type.enum"
import { ProductsCatalogs } from "./products-catalogs.entity"
import { Search } from "./search.entity"

/**
 * @description
 * - state: string
 * - type: string
 * - subType: string
 * - value: number
 * - productsCatalogs: string
 */

@Entity({
  engine: "InnoDB",
})
export class SearchSummaryFields {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn({ type: "varchar" })
  searchType: SearchSummaryFieldsType

  @Column({ type: "float", nullable: true })
  valueNum: number

  @Column({ type: "varchar", nullable: true })
  valueStr: string

  @PrimaryColumn()
  @ManyToOne(() => Search, (s) => s.id, {
    cascade: true,
  })
  @JoinColumn()
  searchId: number
}

enum SearchSummaryFieldsType {}
