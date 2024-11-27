import { Column, Entity, OneToOne, PrimaryColumn, Unique } from "typeorm"
import { ProductsCatalogs } from "./products-catalogs.entity"

@Entity({
  engine: "InnoDB",
})
export class ProductViewsSummary {
  @Column({ type: "varchar" })
  startDate: string

  @Column({ type: "varchar" })
  endDate: string

  @Column({ type: "float" })
  dailyAvg: number

  @Column({ type: "int" })
  totalVisits: number

  @Column({ type: "float", nullable: true })
  cv: number

  @OneToOne(() => ProductsCatalogs, (product) => product.views)
  @PrimaryColumn()
  id: string
}
