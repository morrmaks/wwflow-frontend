const ROUTE_SEGMENTS = {
  auth: '/auth',
  app: '/app'
} as const;

const ROUTES = {
  main: '/',
  authLogin: `${ROUTE_SEGMENTS.auth}/login`,
  authRegister: `${ROUTE_SEGMENTS.auth}/register`,

  appBoards: `${ROUTE_SEGMENTS.app}/boards`,
  appBoardsId: (id: string) => `${ROUTE_SEGMENTS.app}/boards/${id}`,
  appCanvas: `${ROUTE_SEGMENTS.app}/canvas`,
  appCanvasId: (id: string) => `${ROUTE_SEGMENTS.app}/canvas/${id}`,
  appProfile: `${ROUTE_SEGMENTS.app}/profile`,
  appSettings: `${ROUTE_SEGMENTS.app}/settings`
} as const;

export { ROUTE_SEGMENTS, ROUTES };
