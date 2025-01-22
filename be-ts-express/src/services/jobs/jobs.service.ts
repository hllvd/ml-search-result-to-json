import { Jobs } from "../../entities/sql/jobs.entity"
import { EntityType } from "../../enums/entity-type.enum"
import { JobServiceType } from "../../enums/jobs-service-type.enum"
import { JobsStatus } from "../../enums/jobs-status.enum"
import jobsRepository from "../../repository/jobs.repository"

export class JobsService {
  private jobs: Jobs[] = []

  public async GetJobs(
    jobServiceType?: JobServiceType,
    limit?: number
  ): Promise<Jobs[]> {
    switch (jobServiceType) {
      case JobServiceType.Products:
        const limitProducts = limit ?? 15
        this.jobs = await jobsRepository.list({
          filter: { productType: EntityType.Product },
          limit: limitProducts,
        })
        break
      case JobServiceType.Catalogs:
        const limitCatalogs = limit ?? 2
        this.jobs = await jobsRepository.list({
          filter: { productType: EntityType.Catalog },
          limit: limitCatalogs,
        })
        break
      default:
        const limitDefault = limit ?? 2
        this.jobs = await jobsRepository.list({ limit: limitDefault })
    }
    this.DecreaseTTl()
    return this.jobs
  }

  public async UpdateStatus(
    jobsStatusToBeUpdated: Jobs[],
    jobStatus: JobsStatus
  ) {
    const jobsStatusUpdated = jobsStatusToBeUpdated.map((job) => ({
      ...job,
      jobStatus,
    }))
    this.jobs = [...this.jobs, ...jobsStatusUpdated]
    this.jobs = await jobsRepository.save(this.jobs)
  }

  private async DecreaseTTl(): Promise<void> {
    const jobsMinusTtl = this.jobs.map((job) =>
      Object.assign(new Jobs(), { ...job, ttl: job.ttl - 1 })
    )
    this.jobs = await jobsRepository.save(jobsMinusTtl)
  }
}
