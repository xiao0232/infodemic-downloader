import React, { useContext, useState } from 'react'

import { CodeBlock } from 'react-code-blocks'
import codeTheme from '../codeTheme'
import Options from '../interfaces/Options'

import { hashtagsContext } from '../hooks/useHashtagsContext'
import { useDownloadTweets } from '../hooks/useDownloadTweets'

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Slider,
  Container,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import { LocalizationProvider, DatePicker } from '@material-ui/lab'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles(() =>
  createStyles({
    customContainer: {
      width: '90%',
      maxWidth: 'none',
      height: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000A0',
      borderRadius: '10px',
    },
    customTextField: {
      '& input': {
        color: '#707070 !important',
        fontWeight: 'bold',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderWidth: '4px',
          borderRadius: '0.5rem',
          borderColor: '#333440',
        },
        '&:hover fieldset': {
          borderColor: '#6253b8',
        },
        '&.Mui-focused fieldset': {
          borderWidth: '4px',
          borderRadius: '0.5rem',
          borderColor: '#6253b8',
        },
      },
      '& svg': {
        color: '#707070 !important',
        transition: '.25s',
        '&:hover': {
          color: '#202020 !important',
        },
      },
    },
    customInnerShadow: {
      boxShadow: '10px 10px 16px rgba(0, 0, 0, 0.2) inset',
      filter: 'var(--tw-filter)',
    },
  }),
)

const DownloadOptionModal = React.forwardRef(() => {
  const classes = useStyles()

  const FORMAT_LIST = ['CSV', 'JSON']
  const [format, setFormat] = useState(FORMAT_LIST[0])
  const ORDER_LIST = ['DESC', 'SCORE', 'ASC']
  const [order, setOrder] = useState(0)
  const [num, setNum] = useState(0)
  const [sdate, setSdate] = useState<Date | null>(new Date('2020-02-20'))
  const [edate, setEdate] = useState<Date | null>(new Date('2021-03-30'))

  const [options, setOptions] = useState<Partial<Options>>({
    order: 0,
    n: 5,
  })

  const hashtags = useContext(hashtagsContext)
  const [DownloadTweets, DownloadFile] = useDownloadTweets({
    hashtags: hashtags.hashtags,
    fileType: format.toLowerCase(),
    options: options,
  })

  const formatDate = (dt: Date) => {
    const y = dt.getFullYear()
    const m = ('00' + (dt.getMonth() + 1)).slice(-2)
    const d = ('00' + dt.getDate()).slice(-2)
    return [y, m, d].join('')
  }

  const PreviewCard = () => {
    return (
      <>
        <div className="preview-card w-[30vw] h-[90%] mx-[5vh] my-[2.5vh] flex flex-col">
          <div className="w-[calc(100%-2*4px)] card no-scrollbar block h-full overflow-x-scroll">
            <div
              className={`w-full mx-auto rounded-[.5rem] flex ${
                DownloadTweets.loading && 'loading'
              }`}
            >
              <p className="ml-[calc(20%-1vh)] flex-1 my-2 w-full text-center text-3xl font-semibold">
                Preview
              </p>
              <p className="w-[20%] mr-[1vw] my-2 text-center text-3xl font-semibold">
                {DownloadTweets.dryQuery}
              </p>
            </div>
            <div className="w-[90%] h-[calc(90%-1rem-2.25rem-2*6px)] no-scrollbar mx-auto my-8 overflow-scroll">
              <CodeBlock
                text={
                  format === FORMAT_LIST[0]
                    ? DownloadTweets.data
                    : JSON.stringify(DownloadTweets.data[0], undefined, 4)
                }
                language="json"
                theme={codeTheme}
              />
            </div>
          </div>
          <a
            onClick={DownloadFile}
            className="w-[calc(100%-2*4px)] py-[1vh] card mt-[1vh] flex cursor-pointer"
          >
            Download
          </a>
        </div>
      </>
    )
  }

  const OptionCard = () => {
    return (
      <>
        <div className="w-[40vw] h-[90%] mx-[5vh] my-[2.5vh] flex justify-center">
          <div className="w-[calc(100%-2*4px)] card no-scrollbar block overflow-x-scroll">
            <div className="flex w-full">
              <p className="flex-1 mx-auto my-2 w-full text-center text-3xl font-semibold">
                Options
              </p>
            </div>
            <div className="w-[80%] h-[calc(100%-1rem-2.25rem-2*6px)] mx-auto">
              <ul>
                <li>
                  Format
                  <RadioGroup
                    value={format}
                    onChange={(event) => setFormat(event.target.value)}
                  >
                    {FORMAT_LIST.map((format, index) => (
                      <FormControlLabel
                        value={format}
                        control={<Radio />}
                        label={format}
                        key={index}
                        className="w-[calc(100%-2*4px)] card my-[1vh] justify-start mx-auto shadow-xl"
                      />
                    ))}
                  </RadioGroup>
                </li>
                <li>
                  Number of Data
                  <Slider
                    value={num}
                    defaultValue={5}
                    valueLabelDisplay="auto"
                    min={0}
                    max={DownloadTweets.dryQuery}
                    onChange={(_, value) => {
                      if (typeof value === 'number') {
                        setNum(value)
                        setOptions({ ...options, n: value < 5 ? 5 : value })
                      }
                    }}
                  />
                </li>
                <li>
                  Order
                  <RadioGroup
                    row
                    value={order}
                    onChange={(_, value) => {
                      setOrder(Number(value))
                      setOptions({ ...options, order: Number(value) })
                    }}
                  >
                    {ORDER_LIST.map((order, index) => (
                      <FormControlLabel
                        value={index - 1}
                        control={<Radio />}
                        label={order}
                        key={index}
                        className="card my-[1vh] mx-[4px] flex-1 justify-start shadow-xl"
                      />
                    ))}
                  </RadioGroup>
                </li>
                <li>
                  Start Date
                  <LocalizationProvider dateAdapter={DateFnsUtils}>
                    <DatePicker
                      value={sdate}
                      onChange={(newValue) => {
                        setSdate(newValue)
                        setOptions({
                          ...options,
                          sdate: newValue ? formatDate(newValue) : '',
                        })
                      }}
                      inputFormat="yyyy-MM-dd"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          className={`w-[calc(100%-2*4px)] card flex justify-start my-[1vh] mx-auto shadow-xl ${classes.customTextField}`}
                        />
                      )}
                      maxDate={edate}
                      mask="____-__-__"
                    />
                  </LocalizationProvider>
                </li>
                <li>
                  End Date
                  <LocalizationProvider dateAdapter={DateFnsUtils}>
                    <DatePicker
                      value={edate}
                      onChange={(newValue) => {
                        setEdate(newValue)
                        setOptions({
                          ...options,
                          edate: newValue ? formatDate(newValue) : '',
                        })
                      }}
                      inputFormat="yyyy-MM-dd"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          className={`w-[calc(100%-2*4px)] card flex justify-start my-[1vh] mx-auto shadow-xl ${classes.customTextField}`}
                        />
                      )}
                      minDate={sdate}
                      mask="____-__-__"
                    />
                  </LocalizationProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Container className={classes.customContainer}>
        <PreviewCard />
        <OptionCard />
      </Container>
    </>
  )
})

export default DownloadOptionModal
