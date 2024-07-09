import { appConfigRepository } from "../entities/app-config.entity"

const setAppConfig = async ({
  domain,
  key,
  value,
}: {
  domain: string
  key: string
  value: string
}) => {
  await appConfigRepository
    .upsert({
      clientId: domain,
      configKey: key,
      configValue: value,
    })
    .go()
}

export { setAppConfig }
