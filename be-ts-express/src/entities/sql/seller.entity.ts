import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({
  engine: "InnoDB",
})
export class Seller {
  @PrimaryColumn({ unique: true })
  id: number

  @Column({ nullable: true })
  nickname: string

  @Column({ nullable: true, type: "varchar", length: 5 })
  sellerAddressStateId: string

  @Column({ nullable: true, type: "varchar", length: 32 })
  userType: string

  @Column({ nullable: true })
  permalink: string

  @Column({ nullable: true, type: "varchar", length: 20 })
  sellerReputationLevelId: string

  @Column({ nullable: true, type: "varchar", length: 20 })
  sellerReputationPowerSellerStatus: string

  @Column({ nullable: true })
  sellerReputationTransactionsTotal: number
}
