import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { ProductsCatalogs } from "./products-catalogs.entity"

@Index("IDX_CUSTOM_INDEX", ["productsCatalogs"])
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

  @Column({ nullable: true, type: "tinyint" })
  positionFull: number

  @Column({ nullable: true, type: "tinyint" })
  positionMedalGold: number

  @Column({ nullable: true, type: "tinyint" })
  positionMedalPlatinum: number

  @Column({ nullable: true, type: "tinyint" })
  positionMedalLider: number

  @Column({ nullable: true, type: "tinyint" })
  positionOfficialStore: number

  @Column({ nullable: true, type: "tinyint" })
  length: number

  @Column({ nullable: true })
  mlOwner: boolean

  @OneToOne(() => ProductsCatalogs, (pc) => pc.id, { cascade: true })
  @JoinColumn()
  @PrimaryColumn()
  productsCatalogs: string
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
