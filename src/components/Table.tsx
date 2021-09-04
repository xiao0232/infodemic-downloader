import React, { useState, useContext } from 'react'
import { useFetchTweets } from '../hooks/useFetchTweets'
import Tooltip from '@material-ui/core/Tooltip'

import { hashtagsContext } from '../hooks/useHashtagsContext'

const Table: React.VFC = () => {
  const hashtags = useContext(hashtagsContext)
  const { columns, data, loading } = useFetchTweets(hashtags)

  const highlightText = (text: string) => {
    const regexp = new RegExp(`(${hashtags.hashtags})`, 'gi')
    text = text.replace(regexp, '<span class="highlight">$1</span>')
    return text
  }

  const TableCell = ({
    value,
    isHighlight,
  }: {
    value: any
    isHighlight: boolean
  }) => {
    const [isShow, setShow] = useState(false)

    const td = (
      <td
        className="w-[calc(100%/32-2*4px)] min-w-[180px] table-cell text-center bg-dark-data"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <p
          className="clamp"
          dangerouslySetInnerHTML={{
            __html: isHighlight ? highlightText(value) : value,
          }}
        ></p>
      </td>
    )

    return (
      <>
        {isShow ? (
          <Tooltip title={value === null ? '' : value} followCursor>
            {td}
          </Tooltip>
        ) : (
          td
        )}
      </>
    )
  }

  return (
    <>
      <div className="z-[1] h-[60vw] max-h-[calc(1024px*60/100)] mx-[5vh] my-[2.5vh] relative flex justify-center">
        <div
          className={`w-[calc(100%-2*4px)] card absolute block ${
            !loading && 'after:bg-glow'
          }`}
        >
          <table className="border-spacing-5 scroll block table-auto m-4 border-separate">
            <thead>
              <tr>
                {columns.map((column, r) => (
                  <th
                    key={r}
                    className={`w-[calc(100%/32-2*4px)] h-[calc(100%/6-2*4px)] table-cell bg-dark-column ${
                      loading && 'loading'
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="before:content-[''] before:block before:leading-4">
              {data.map((row, c) => (
                <tr key={c}>
                  {row.map((value, r) => (
                    <TableCell value={value} key={r} isHighlight={r === 2} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table
