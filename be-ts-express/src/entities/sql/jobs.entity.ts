import { ProductsCatalogs } from "./products-catalogs.entity"
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  UsingJoinColumnIsNotAllowedError,
} from "typeorm"
import { JobsDescription } from "./jobs-description.entity"
import { JobsStatus } from "../../enums/jobs-status.enum"
import { JobsPriority } from "../../enums/jobs-priority.enum"

/**
 * @description
 */

Unique(["products", "jobsDescription"])
@Entity({
  engine: "InnoDB",
})
export class Jobs {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "tinyint", default: JobsStatus.Pending })
  jobStatus: JobsStatus

  @Column({ type: "tinyint", default: JobsPriority.Medium })
  jobPriority: JobsPriority

  @Column({ type: "tinyint", default: 5 })
  ttl: number

  @ManyToOne(() => JobsDescription, (jobs) => jobs)
  @JoinTable()
  jobsDescription: JobsDescription

  @ManyToMany(() => ProductsCatalogs, (pc) => pc)
  @JoinTable()
  products: ProductsCatalogs[]

  @UpdateDateColumn({ type: "datetime" })
  metadataUpdatedAt: Date
  job1: ProductsCatalogs
}
