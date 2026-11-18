import { defineConfig } from 'nitro'

export default defineConfig({
  serverDir: './',
  experimental: {
    tasks: true,
  },
  scheduledTasks: {
    // 每日北京时间 00:30（Cloudflare cron 使用 UTC，16:30 UTC = 次日 00:30 UTC+8）执行一次
    '30 16 * * *': ['attendance'],
    // 临时：仅用于部署后立即验证一次，验证完成后删除这一行
    '*/5 * * * *': ['attendance'],
  },
  runtimeConfig: {
    tokens: '',
    notificationUrls: '',
    maxRetries: '3',
    nitro: {
      envPrefix: 'SKLAND_',
    },
  },
  rolldownConfig: {
    output: {
      codeSplitting: {
        groups: [
          {
            name: 'unstorage',
            test: /node_modules\/unstorage\/dist\/drivers\/(?!redis)/,
          },
          {
            name: 'unstorage-drivers-redis',
            test: /node_modules\/unstorage\/dist\/drivers\/redis/,
          },
        ],
      },
    },
  },
})
