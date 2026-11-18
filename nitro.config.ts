import { defineConfig } from 'nitro'

export default defineConfig({
  serverDir: './',
  experimental: {
    tasks: true,
  },
  scheduledTasks: {
    // 每日北京时间 00:30（Cloudflare cron 使用 UTC，16:30 UTC = 次日 00:30 UTC+8）执行一次
    '30 16 * * *': ['attendance'],
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
