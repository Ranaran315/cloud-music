import { InjectionKey, reactive } from 'vue'

interface SearchContext {
  state: {
    result: any
    loading: boolean
  }
  setResult: (result: any) => void
  setLoading: (loading: boolean) => void
}

export const SearchContextKey: InjectionKey<SearchContext> = Symbol('search')

export function useSearchContext() {
  const state = reactive({
    result: {},
    loading: false,
  })

  const setResult = (result: any) => {
    state.result = result
  }

  const setLoading = (loading: boolean) => {
    state.loading = loading
  }

  return {
    state,
    setResult,
    setLoading,
  }
}
