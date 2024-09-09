import { InjectionKey, reactive } from 'vue'

interface SearchContext {
  state: {
    result: any
  }
  setResult: (result: any) => void
}

export const SearchContextKey: InjectionKey<SearchContext> = Symbol('search')

export function useSearchContext() {
  const state = reactive({
    result: {},
  })

  const setResult = (result: any) => {
    state.result = result
  }

  return {
    state,
    setResult,
  }
}
