import { Entity, Column, PrimaryColumn, Index } from "typeorm"

enum EntityType {
  catalog = "catalog",
  product = "product",
}

@Entity()
@Index("IDX_CUSTOM_INDEX", ["id", "type"])
export class productCatalog {
  @PrimaryColumn({ unique: true })
  id: string

  @Column()
  type: EntityType

  // @Column()
  // catalogId: string

  // @Column()
  // catalogImgUrl: string

  // @Column()
  // permanentLink: string

  // @Column()
  // medalLiderPercent: number

  // @Column()
  // medalGoldPercent: number

  // @Column()
  // medalPlatinumPercent: number

  // @Column()
  // shipmentFullPercent: number

  // @Column()
  // shipmentColetaPercent: number

  // @Column()
  // priceDispersion: number

  // @Column()
  // priceWin: number

  // @Column()
  // priceWithFees: number

  // @Column()
  // priceAvg: number

  // @Column()
  // category: string

  // @Column()
  // totalRevenue: number

  // @Column()
  // totalSellers: number

  // @Column()
  // title: string

  // @Column()
  // brandId: number

  // @Column()
  // sellerOldestDate: string

  // @Column()
  // sellerNewestDate: string

  // @Column()
  // summaryCreation: number
}
/**
- catalog_old_post Anuncio mais antigo
* - Categorias relacionadas (vasculhar em todos os anuncios )
* - catalog_title
* - catalog_brand
* - product_id
*
* - summary_created
* - summary_userId
* - summary_ttl
**/
