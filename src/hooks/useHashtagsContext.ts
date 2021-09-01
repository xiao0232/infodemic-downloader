import { createContext, useCallback, useState } from 'react'

interface HashtagsContext {
  hashtags: string
  setHashtagsContext: (hashtag: string) => void
}

const defaultContext: HashtagsContext = {
  hashtags: '',
  setHashtagsContext: () => {
    // default: empty function
  },
}

// context object
export const hashtagsContext = createContext<HashtagsContext>(defaultContext)

// custom Hook
export const useHashtagsContext = (propHashtags: string): HashtagsContext => {
  const [hashtags, setHashtags] = useState(propHashtags)

  const setHashtagsContext = useCallback((newHashtags: string): void => {
    setHashtags(newHashtags)
  }, [])
  return {
    hashtags,
    setHashtagsContext,
  }
}
