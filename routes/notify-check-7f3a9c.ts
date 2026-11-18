import { defineEventHandler } from 'nitro/h3'
import { useRuntimeConfig } from 'nitro/runtime-config'
import { createNotifier } from 'statocysts'
import { getSplitByComma } from '~/utils/index'

// 临时路由：仅用于验证 SKLAND_NOTIFICATION_URLS 配置是否正确，验证后删除
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const urls = getSplitByComma(config.notificationUrls || '')

  if (urls.length === 0) {
    return { ok: false, reason: 'SKLAND_NOTIFICATION_URLS 未配置' }
  }

  try {
    await createNotifier(urls).send({
      title: '【森空岛每日签到】测试消息',
      body: `这是一条测试推送，收到即代表通知渠道配置正确。\n\n目标数：${urls.length}\n时间（UTC）：${new Date().toISOString()}`,
    })
    return { ok: true, targets: urls.length }
  }
  catch (error) {
    return {
      ok: false,
      targets: urls.length,
      error: error instanceof Error ? error.message : String(error),
    }
  }
})
