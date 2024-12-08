import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm"
import { ProductsCatalogs } from "./products-catalogs.entity"

@Entity({
  engine: "InnoDB",
})
export class CatalogFields {
  @Column({ nullable: true, type: "float" })
  priceBest: number

  @Column({ nullable: true, type: "float" })
  priceSecond: number

  @Column({ nullable: true, type: "float" })
  priceTop5Avg: number

  @Column({ nullable: true, type: "float" })
  priceFull: number

  @Column({ nullable: true, type: "int" })
  positionFull: number

  @Column({ nullable: true, type: "int" })
  positionMedalGold: number

  @Column({ nullable: true, type: "int" })
  positionMedalPlatinum: number

  @Column({ nullable: true, type: "int" })
  positionMedalLider: number

  @Column({ nullable: true, type: "int" })
  positionOfficialStore: number

  @Column({ nullable: true, type: "int" })
  length: number

  @Column({ nullable: true })
  mlOwner: boolean

  @OneToOne(() => ProductsCatalogs, (product) => product.catalogFields)
  @PrimaryColumn()
  id: string
}

/**
 * "price": {
        "top5Avg": 1850.98,
        "best": 1799.99,
        "secondBest": 1849,
        "full": 1799.99
    },
    "position": {
        "full": 1,
        "medalGold": null,
        "medalPlatinum": 1,
        "medalLider": 20,
        "officialStore": 1
    },
    "length": 25,
    // "dateCreated": "2024-08-28T17:40:30.000Z",
    "mlOwner": false,
 */
