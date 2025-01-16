import { ProductsCatalogs } from "./products-catalogs.entity"
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm"

import { JobsStatus } from "../../enums/jobs-status.enum"
import { JobsPriority } from "../../enums/jobs-priority.enum"
import { JobGroups } from "./job-groups.entity"

/**
 * @description
 */

Unique(["product", "jobGroups"])
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

  @ManyToOne(() => JobGroups, (jobs) => jobs)
  @JoinTable()
  jobGroups: JobGroups

  @ManyToOne(() => ProductsCatalogs, (pc) => pc.jobs)
  @JoinColumn()
  product: ProductsCatalogs

  @UpdateDateColumn({ type: "datetime" })
  metadataUpdatedAt: Date
}
