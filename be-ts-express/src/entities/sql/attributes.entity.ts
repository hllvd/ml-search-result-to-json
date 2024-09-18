import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ProductsCatalogs } from "./products-catalogs.entity"

@Entity()
export class Attributes {
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

  @ManyToOne(() => ProductsCatalogs, (product) => product.attribute)
  productCatalog: ProductsCatalogs
}
