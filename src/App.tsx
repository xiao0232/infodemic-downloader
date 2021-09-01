import React from 'react'
import Downloader from './components/Downloader'
import Table from './components/Table'
import SearchBar from './components/SearchBar'

import { hashtagsContext, useHashtagsContext } from './hooks/useHashtagsContext'

const App: React.VFC = () => {
  const hashtags = useHashtagsContext('covid19')

  return (
    <div>
      <header className="mx-auto my-2 w-full text-center text-3xl font-semibold">
        Infodemic Downloader
      </header>
      <div className="my-[2.5vh] w-[80vw] mx-auto max-w-screen-lg h-auto">
        <hashtagsContext.Provider value={hashtags}>
          <Downloader />
          <SearchBar />
          <Table />
        </hashtagsContext.Provider>
      </div>
    </div>
  )
}

export default App
