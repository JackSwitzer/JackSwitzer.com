interface Config {
  baseUrl: string
  title: string
  description: string
}

const defaultConfig: Config = {
  baseUrl: 'https://jackswitzer.com',
  title: 'Jack Switzer',
  description: 'Software Developer & Applied Mathematics Student'
}

const devConfig: Config = {
  baseUrl: 'http://localhost:3000',
  title: 'Jack Switzer (Dev)',
  description: 'Software Developer & Applied Mathematics Student'
}

const prodConfig: Config = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || defaultConfig.baseUrl,
  title: defaultConfig.title,
  description: defaultConfig.description
}

const config: Config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : process.env.NODE_ENV === 'development'
    ? devConfig
    : defaultConfig

export default config
