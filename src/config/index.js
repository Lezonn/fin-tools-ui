const FIN_TOOLS_API = 'http://localhost:8080'

const pages = {
  baseTitle: 'Fin Tools',
  home: {
    path: '/',
    name: 'Home',
    title: 'Home'
  },
  notFound: {
    base: {
      path: '/not-found',
      name: 'NotFound',
      title: 'Page Not Found'
    },
    wildCard: {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundCatchAll',
      title: 'Page Not Found'
    }
  }
}

const api = {
  oauthGoogle: {
    login: `${FIN_TOOLS_API}/auth/google/login`
  }
}

export default { pages, api }
