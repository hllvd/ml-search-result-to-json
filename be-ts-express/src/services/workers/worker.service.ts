import { JobServiceType } from "../../enums/jobs-service-type.enum"
import { JobsStatus } from "../../enums/jobs-status.enum"
import { JobsService } from "../jobs/jobs.service"

export class WorkerService {
  private isRunning: boolean = false
  constructor(
    private readonly jobService: JobsService = new JobsService(),
    private readonly worker: (data: any) => Promise<void>,
    private readonly batchSize: number,
    private readonly delay: number,
    private readonly jobServiceType?: JobServiceType
  ) {}

  public async start() {
    this.isRunning = true
    while (this.isRunning) {
      const jobs = this.batchSize
        ? await this.jobService.GetJobs(this.jobServiceType, this.batchSize)
        : await this.jobService.GetJobs(this.jobServiceType)
      try {
        if (jobs.length > 0) {
          await this.worker(jobs)
          this.jobService.UpdateStatus(jobs, JobsStatus.Completed)
        }
      } catch {
        this.jobService.UpdateStatus(jobs, JobsStatus.Failed)
      } finally {
        await this.sleep(this.delay)
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
