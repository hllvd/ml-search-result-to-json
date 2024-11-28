import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm"
import {
  StateFieldSubType,
  StateFieldType,
} from "../../enums/state-field-type.enum"
import { ProductsCatalogs } from "./products-catalogs.entity"

/**
 * @description
 * - state: string
 * - type: string
 * - subType: string
 * - value: number
 * - productsCatalogs: string
 */

@Index("IDX_CUSTOM_INDEX", ["state", "subType", "productCatalog"])
@Entity({
  engine: "InnoDB",
})
export class StateFields {
  @PrimaryColumn({ type: "varchar", length: 5 })
  state: string

  @PrimaryColumn({ type: "varchar" })
  type: StateFieldType

  @PrimaryColumn({ type: "varchar", length: 24 })
  subType: StateFieldSubType

  @Column({ type: "float" })
  value: number

  @PrimaryColumn()
  @ManyToOne(() => ProductsCatalogs, (pc) => pc.id, {
    cascade: true,
  })
  @JoinColumn()
  productCatalog: string
}
