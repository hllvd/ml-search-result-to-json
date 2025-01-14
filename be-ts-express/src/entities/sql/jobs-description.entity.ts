import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Jobs } from "./jobs.entity"
import { JobsStatus } from "../../enums/jobs-status.enum"

/**
 * @description
 */

@Entity({
  engine: "InnoDB",
})
export class JobsDescription {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 128 })
  description: string

  @Column({ type: "integer", default: JobsStatus.Pending })
  status: JobsStatus

  @OneToMany(() => Jobs, (jobs) => jobs)
  jobs: Jobs[]

  @UpdateDateColumn({ type: "datetime" })
  metadataUpdatedAt: Date
}
