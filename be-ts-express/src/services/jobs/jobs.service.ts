import { JobType } from "aws-sdk/clients/sagemaker"
import { Jobs } from "../../entities/sql/jobs.entity"
import { EntityType } from "../../enums/entity-type.enum"
import { JobsStatus } from "../../enums/jobs-status.enum"
import jobsRepository from "../../repository/jobs.repository"

enum JobsType {
  Products,
  Catalogs,
}

export class JobsService {
  private jobs: Jobs[] = []

  public async GetJobs(jobsType?: JobsType, limit?: number): Promise<Jobs[]> {
    switch (jobsType) {
      case JobsType.Products:
        const limitProducts = limit ?? 15
        this.jobs = await jobsRepository.list({
          filter: { productType: EntityType.Product },
          limit: limitProducts,
        })
        break
      case JobsType.Catalogs:
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
