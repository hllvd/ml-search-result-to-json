import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({
  engine: "InnoDB",
})
export class Categories {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({ nullable: true, type: "int" })
  totalItems: number
}
