import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

import SampleData from '../sample.json'
import Options from '../interfaces/Options'

interface Props {
  hashtags: string
  fileType: string
  options?: Partial<Options>
}

interface TweetsResponse {
  data: any
  loading: boolean
  dryQuery: number
}

export const useDownloadTweets = (
  props: Props,
): [TweetsResponse, () => void] => {
  const [res, setRes] = useState<TweetsResponse>({
    data: SampleData.data,
    loading: false,
    dryQuery: 0,
  })

  const [link, setLink] = useState('')

  useEffect(() => {
    fetchRequest(props)
  }, [props.hashtags, props.fileType, props.options])

  const fetchRequest = async ({ hashtags, fileType, options }: Props) => {
    setRes({ ...res, loading: true })
    const url = new URL(
      'https://mongo-fastapi01.herokuapp.com/api/' +
        `${fileType}-tweets/${hashtags}`,
    )
    const param = new URLSearchParams(Object(options)).toString()
    setLink(`${url.toString()}?${param}`)
    let dryQuery = 0

    await axios
      .get(
        'https://mongo-fastapi01.herokuapp.com/api/' + `dry-query/${hashtags}`,
      )
      .then((response) => {
        dryQuery = response.data.count
      })
      .catch((error: AxiosError) => {
        console.log(error)
      })

    await axios
      .get(url.toString(), {
        params: { ...options, n: fileType === 'csv' ? 24 : 5 },
      })
      .then((response) => {
        setRes({
          data: response.data,
          dryQuery: dryQuery,
          loading: false,
        })
      })
      .catch((error: AxiosError) => {
        console.log(error)
        setRes({ ...res, dryQuery: dryQuery, loading: false })
      })
  }

  const downloadFile = async () => {
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = link
    tempLink.setAttribute(
      'download',
      `tweets_${props.hashtags}_${props.options?.n ? props.options.n : 5}.${
        props.fileType
      }`,
    )

    document.body.appendChild(tempLink)
    tempLink.click()

    window.URL.revokeObjectURL(link)
    document.body.removeChild(tempLink)
  }

  return [res, downloadFile]
}
