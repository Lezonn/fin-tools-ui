const FIN_TOOLS_API = 'http://localhost:8080'

const pages = {
  baseTitle: 'Fin Tools',
  home: {
    path: '/',
    name: 'Home',
    title: 'Home'
  },
  testAuthResource: {
    path: '/test-auth-resource',
    name: 'testAuthResource',
    title: 'Test Auth Resource'
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
    callback: `${FIN_TOOLS_API}/auth/google/callback`
  },
  expenses: {
    getAll: `${FIN_TOOLS_API}/api/expenses`
  },
  expenseCategories: {
    getAll: `${FIN_TOOLS_API}/api/expense-categories`
  },
  test: {
    AuthResource: `${FIN_TOOLS_API}/test-auth-resource`
  }
}

export { pages, api }
