import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { SearchSummaryFieldsType } from "../../enums/search-summary-fields-types.enum"
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
  id?: number

  @PrimaryColumn({ type: "varchar" })
  searchType: SearchSummaryFieldsType

  @Column({ type: "float", nullable: true })
  valueNum: number

  @Column({ type: "varchar", nullable: true })
  valueStr: string

  @ManyToOne(() => Search, (search) => search.id)
  search: Search
}
