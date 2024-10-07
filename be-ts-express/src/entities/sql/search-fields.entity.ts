import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({
  engine: "InnoDB",
})
export class SearchFields {
  @PrimaryColumn()
  term: string

  @Column({ nullable: true, type: "int" })
  views: number

  @Column({ nullable: true, type: "float" })
  revenue: number

  @Column({ nullable: true, type: "float" })
  avgPrice: number

  @Column({ nullable: true, type: "float" })
  densityFull: number

  @Column({ nullable: true, type: "float" })
  densityLider: number

  @Column({ nullable: true, type: "float" })
  densityOfficialStore: number

  @Column({ nullable: true, type: "float" })
  densityGold: number

  @Column({ nullable: true, type: "float" })
  densityPlatinum: number

  @Column({ nullable: true, type: "float" })
  densityCatalog: number

  @Column({ nullable: true, type: "float" })
  densityGoodQualityThumbnail: number

  @Column({ nullable: true, type: "float" })
  densityVideo: number

  @Column({ nullable: true, type: "float" })
  densityGoodQualityPicture: number

  @Column({ nullable: true, type: "float" })
  densityFreeShipment: number

  @Column({ nullable: true, type: "float" })
  worstStar: number
}
