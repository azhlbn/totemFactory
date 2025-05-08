import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// URL для The Graph API на сети Minato
// Используем переменную окружения или значение по умолчанию
const GRAPH_API_URL = process.env.NEXT_PUBLIC_GRAPH_API_URL || 'https://api.studio.thegraph.com/query/101656/mytho-minato/version/latest';

// Если вы еще не создали подграф, вы можете сделать это с помощью The Graph Studio:
// 1. Зарегистрируйтесь на https://thegraph.com/studio/
// 2. Создайте новый подграф для сети Minato
// 3. Определите схему GraphQL для индексации событий TotemCreated

const httpLink = new HttpLink({
  uri: GRAPH_API_URL,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});
