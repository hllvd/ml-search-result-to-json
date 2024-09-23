import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  engine: "InnoDB",
})
export class CatalogFields {
  @PrimaryGeneratedColumn()
  id: number

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
