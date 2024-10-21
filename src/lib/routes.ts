
export const PUBLIC_ROUTES = [
  /^\/$/,
  /^\/sign-in$/,
  /^\/course\/[^\/]+$/
]

export const PUBLIC_ONLY_ROUTES = [
  /^\/sign-in$/
]

export const NOT_AUTH_ROUTE = '/sign-in'

export const AFTER_AUTH_ROUTE = '/profile'