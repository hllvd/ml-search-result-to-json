import dataSource from "../db/data-source"
import { JobGroups } from "../entities/sql/job-groups.entity"

import { JobsStatus } from "../enums/jobs-status.enum"

const create = async (
  description: string,
  { status }: { status?: JobsStatus } = {}
): Promise<JobGroups> => {
  const jobGroups = new JobGroups()
  jobGroups.description = description
  jobGroups.status = status
  try {
    await dataSource.manager.getRepository(JobGroups).save(jobGroups)
    return jobGroups
  } catch (e) {
    console.log(e)
  }
}

export default { create }
