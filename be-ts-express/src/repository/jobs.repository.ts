import dataSource from "../db/data-source"

import { JobsStatus } from "../enums/jobs-status.enum"
import { JobsPriority } from "../enums/jobs-priority.enum"
import { Jobs } from "../entities/sql/jobs.entity"
import { FindManyOptions, MoreThan } from "typeorm"
import { EntityType } from "../enums/entity-type.enum"

const save = async (jobs: Jobs | Array<Jobs>): Promise<void> => {
  const jobsArray = Array.isArray(jobs) ? jobs : [jobs]
  try {
    await dataSource.manager.getRepository(Jobs).save(jobsArray)
  } catch (e) {
    console.log(e)
  }
}

interface JobsRepositoryListParam {
  filter?: {
    productType?: EntityType
    jobStatus?: JobsStatus
    jobPriority?: JobsPriority
  }
  limit?: number
}

const list = async (
  arg: JobsRepositoryListParam = {
    limit: 30,
    filter: {
      jobStatus: JobsStatus.Pending,
      productType: null,
      jobPriority: null,
    },
  }
): Promise<Array<Jobs>> => {
  const { filter = {}, limit } = arg

  const {
    productType = null,
    jobPriority = null,
    jobStatus = JobsStatus.Pending,
  } = filter

  let options: FindManyOptions<Jobs> = {}

  if (productType) {
    options = { where: { product: { type: productType } } }
  }

  if (jobPriority) {
    options = {
      ...options,
      where: { ...options?.where, jobPriority: jobPriority },
    }
  }

  if (jobStatus) {
    options = { ...options, where: { ...options?.where, jobStatus: jobStatus } }
  }

  const defaultOptions: FindManyOptions<Jobs> = {
    where: {
      jobStatus,
      ttl: MoreThan(0),
    },
    relations: ["product", "jobGroups"],
    order: {
      jobPriority: "DESC",
      metadataUpdatedAt: "ASC",
    },
    take: limit,
    skip: 0,
  }
  const jobs = await dataSource
    .getRepository(Jobs)
    .find({ ...defaultOptions, ...options })

  return jobs
}

export default { save, list }
