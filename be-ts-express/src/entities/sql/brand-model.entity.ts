import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"
import { ProductsCatalogs } from "./products-catalogs.entity"
@Unique(["brand", "model", "color"])
@Entity({
  engine: "InnoDB",
})
export class BrandModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  brand: string

  @Column({ nullable: true })
  model: string

  @Column({ nullable: true })
  color: string

  @Column({ nullable: true })
  modelDetailed: string
}
