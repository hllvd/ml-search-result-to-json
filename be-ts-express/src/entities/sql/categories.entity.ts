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

  // @Column({ nullable: true })
  // permaLink: string

  // @Column({ nullable: true })
  // hasItems: boolean

  // @Column({ nullable: true })
  // hasChildren: boolean

  // @Column({ nullable: true })
  // parentId: string
}
