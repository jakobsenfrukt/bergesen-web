import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import schema from '@/schema.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema
})

export default ({req, app}) => {
  return {
    httpEndpoint: 'https://test.bergesen-cms.444.no/api',
    cache: new InMemoryCache({ fragmentMatcher })
  }
}
