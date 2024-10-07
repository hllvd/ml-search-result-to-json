import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm"
import { EntityType } from "../../enums/entity-type.enum"
import { BrandModel } from "./brand-model.entity"
import { Categories } from "./categories.entity"
import { Seller } from "./seller.entity"
import { StateFields } from "./state-fields.entity"
import { ProductViews } from "./views.entity"

@Index("IDX_CUSTOM_INDEX", ["id", "type"])
@Entity({
  engine: "InnoDB",
})
export class ProductsCatalogs {
  @PrimaryColumn({ unique: true })
  id: string

  @Column({ type: "tinyint" })
  type: EntityType

  @Column({ nullable: true })
  title: string

  @Column({ nullable: true })
  categoryId: string

  @Column({ nullable: true })
  domainId: string

  @Column({ nullable: true, type: "varchar", length: 16 })
  officialStoreId: string

  @Column({ nullable: true, type: "float" })
  price: number

  @Column({ nullable: true, type: "float" })
  basePrice: number

  @Column({ nullable: true, type: "float" })
  originalPrice: number

  @Column({ nullable: true, type: "varchar", length: 32 })
  listingTypeId: string

  @Column({ nullable: true })
  permalink: string

  @Column({ nullable: true })
  videoId: string

  @Column({ type: "varchar", nullable: true })
  ean: string

  @Column({ nullable: true })
  thumbnail: string

  @Column({ nullable: true })
  pictureCount: number

  @Column({ nullable: true })
  health: number

  @Column({ nullable: true })
  shippingFreeShipping: boolean

  @Column({ nullable: true, type: "varchar", length: 20 })
  shippingLogisticType: string

  @Column({ nullable: true, type: "varchar", length: 15 })
  catalogProductId: string

  @Column({ nullable: true })
  catalogListing: boolean

  @Column({ nullable: true, type: "varchar", length: 27 })
  dateCreated: string

  @Column({ nullable: true })
  tagsGoodQualityThumbnail: boolean

  @Column({ nullable: true })
  tagsGoodQualityPicture: boolean

  @Column({ nullable: true })
  hasPromotion: boolean

  @Column({ nullable: true })
  hasVideo: boolean

  @Column({ nullable: true })
  supermarketEligible: boolean

  @Column({ nullable: true }) // fix that
  isKit: boolean

  @Column({ nullable: true })
  revenue: number

  @Column({ nullable: true })
  quantitySold: number

  @Column({ nullable: true, type: "float" })
  currentPrice: number

  @Column({ nullable: true, type: "float" })
  dailyRevenue: number

  @ManyToOne(() => Seller, (seller) => seller.id)
  seller: Seller

  @ManyToOne(() => BrandModel, (attribute) => attribute.id)
  brandModel: BrandModel

  @OneToOne(() => ProductsCatalogs, { nullable: true })
  catalogFields

  @OneToOne(() => ProductViews, { nullable: true })
  views: ProductViews

  @OneToMany(() => ProductsCatalogs, (pc) => pc.id, { nullable: true })
  stateFields: StateFields
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
