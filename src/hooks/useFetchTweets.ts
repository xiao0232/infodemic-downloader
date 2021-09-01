import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

import SampleData from '../sample.json'

interface Props {
  hashtags: string
}

interface TweetsResponse {
  columns: any[]
  data: any[][]
  loading: boolean
}

export const useFetchTweets = ({ hashtags }: Props): TweetsResponse => {
  const [res, setRes] = useState<TweetsResponse>({
    columns: Object.keys(SampleData.data[0]),
    data: SampleData.data.map((row) => Object.values(row)),
    loading: false,
  })

  useEffect(() => {
    fetchRequest({ hashtags })
  }, [hashtags])

  const fetchRequest = async ({ hashtags }: Props) => {
    setRes((prevState) => ({ ...prevState, loading: true }))

    await axios
      .get(
        'https://mongo-fastapi01.herokuapp.com/api/' + `get-tweets/${hashtags}`,
      )
      .then((response) => {
        setRes({
          ...res,
          data: response.data.map((row: any) => Object.values(row)),
          loading: false,
        })
      })
      .catch((error: AxiosError) => {
        console.log(error)
        setRes({ ...res, loading: false })
      })
  }

  return res
}
