import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { ProductsCatalogs } from "./products-catalogs.entity"

@Entity({
  engine: "InnoDB",
})
export class ProductViewsSummary {
  @PrimaryGeneratedColumn()
  id: string

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

  @OneToOne(() => ProductsCatalogs, (pc) => pc.id, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  productsCatalogs: string
}
