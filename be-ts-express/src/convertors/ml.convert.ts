import { ProductsCatalogs } from "../entities/sql/products-catalogs.entity"
import { Seller } from "../entities/sql/seller.entity"
import { EntityType } from "../enums/entity-type.enum"
import { ProductApiResponse } from "../models/api-response/api/product-response.models"
import { MLUser } from "../models/dto/ml-user.models"

export const convertProductApiResponseToProductCatalogEntity = (
  productApiResponse: ProductApiResponse
): ProductsCatalogs => {
  const product = new ProductsCatalogs()
  product.id = productApiResponse.id
  product.type = EntityType.product
  product.title = productApiResponse.title
  product.categoryId = productApiResponse.category_id
  product.domainId = productApiResponse.domain_id
  product.supermarketEligible = productApiResponse.supermarket_eligible
  product.officialStoreId = productApiResponse.official_store_id
    ? productApiResponse.official_store_id.toString()
    : null
  product.price = productApiResponse.price
  product.basePrice = productApiResponse.base_price
  product.originalPrice = productApiResponse.original_price
  product.listingTypeId = productApiResponse.listing_type_id
  product.permalink = productApiResponse.permalink
  product.thumbnail = productApiResponse.thumbnail
  product.pictureCount = productApiResponse.picture_count
  product.videoId = productApiResponse.video_id

  product.health = productApiResponse.health
  product.tagsGoodQualityThumbnail = productApiResponse.tags?.includes(
    "good_quality_thumbnail"
  )
  product.tagsGoodQualityPicture = productApiResponse.tags?.includes(
    "good_quality_picture"
  )
  product.shippingFreeShipping = productApiResponse.shipping?.free_shipping
  product.shippingLogisticType = productApiResponse.shipping.logistic_type
  product.catalogProductId = productApiResponse.catalog_product_id
  product.catalogListing = productApiResponse.catalog_listing
  product.dateCreated = productApiResponse.date_created
  product.hasPromotion = productApiResponse.has_promotion
  product.hasVideo = productApiResponse.has_video
  product.revenue = productApiResponse.revenue
  product.quantitySold = productApiResponse.quantity_sold
  product.currentPrice = productApiResponse.current_price
  product.dailyRevenue = productApiResponse.daily_revenue

  return product
}

export const convertMLUserFromApiResponseToSellerEntity = (
  mlUser: MLUser
): Seller => {
  const seller = new Seller()
  seller.id = mlUser.id
  seller.nickname = mlUser.nickname
  seller.permalink = mlUser.permalink
  seller.sellerReputationLevelId = mlUser.seller_reputation.level_id
  seller.sellerReputationPowerSellerStatus =
    mlUser.seller_reputation.power_seller_status
  seller.sellerReputationTransactionsTotal =
    mlUser?.seller_reputation?.transactions?.total
  seller.sellerReputationTransactionsTotal =
    mlUser?.seller_reputation?.transactions?.total
  return seller
}
