import dataSource from "../db/data-source"
import { JobGroups } from "../entities/sql/job-groups.entity"

import { JobsStatus } from "../enums/jobs-status.enum"
import { JobsPriority } from "../enums/jobs-priority.enum"
import { Jobs } from "../entities/sql/jobs.entity"
import { ProductsCatalogs } from "../entities/sql/products-catalogs.entity"

const save = async (jobs: Jobs | Array<Jobs>): Promise<void> => {
  const jobsArray = Array.isArray(jobs) ? jobs : [jobs]
  try {
    await dataSource.manager.getRepository(Jobs).save(jobsArray)
  } catch (e) {
    console.log(e)
  }
}

export default { save }
