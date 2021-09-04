import React, { useContext, useState } from 'react'

import Container from '@material-ui/core/Container'
import { makeStyles, createStyles } from '@material-ui/styles'

import { CodeBlock } from 'react-code-blocks'
import codeTheme from '../codeTheme'
import Options from '../interfaces/Options'

import { hashtagsContext } from '../hooks/useHashtagsContext'
import { useDownloadTweets } from '../hooks/useDownloadTweets'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import TextField from '@material-ui/core/TextField'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import DatePicker from '@material-ui/lab/DatePicker'

import Slider from '@material-ui/core/Slider'

import moment from 'moment'

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

const DownloadOptionModal: React.VFC = () => {
  const classes = useStyles()

  const FORMAT_LIST = ['CSV', 'JSON']
  const [format, setFormat] = useState(FORMAT_LIST[0])
  const ORDER_LIST = ['DESC', 'SCORE', 'ASC']
  const [order, setOrder] = useState(0)
  const [num, setNum] = useState(0)
  const [sdate, setSdate] = useState(new Date('2020-02-20'))
  const [edate, setEdate] = useState(new Date('2021-03-30'))

  const [options, setOptions] = useState<Partial<Options>>({
    order: 0,
    n: 5,
    // isBom: false,
    // isTsv: false,
    // sdate: '20200220',
    // edate: '20210330',
  })

  const hashtags = useContext(hashtagsContext)
  const [DownloadTweets, DownloadFile] = useDownloadTweets({
    hashtags: hashtags.hashtags,
    fileType: format.toLowerCase(),
    options: options,
  })

  const PreviewCard = () => {
    return (
      <>
        <div className="preview-card w-[30vw] h-[90%] mx-[5vh] my-[2.5vh] flex flex-col">
          <div className="w-[calc(100%-2*4px)] h-full card scroll block">
            <div
              className={`w-full mx-auto rounded-[.5rem] flex ${
                DownloadTweets.loading && 'loading'
              }`}
            >
              <p className="flex-1 ml-[calc(20%-1vh)] my-2 w-full text-center text-3xl font-semibold">
                Preview
              </p>
              <p className="w-[20%] mr-[1vw] my-2 text-center text-3xl font-semibold">
                {DownloadTweets.dryQuery}
              </p>
            </div>
            <div className="w-[90%] h-[calc(90%-1rem-2.25rem-2*6px)] scroll mx-auto my-8">
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
            href={DownloadFile}
            className="w-[calc(100%-2*4px)] py-[1vh] card flex mt-[1vh]"
          >
            Download
          </a>
        </div>
      </>
    )
  }

  const OptionCard = () => {
    // const OptionDatePicker = (label: string) => {
    //   const [value, setValue] = useState<Date>(
    //     label === 'sdate' ? sdate : edate,
    //   )

    //   return (
    //     <>
    //       <LocalizationProvider dateAdapter={AdapterDateFns}>
    //         <DatePicker
    //           value={value}
    //           onChange={(newValue) => {
    //             setValue(new Date(String(newValue)))
    //             setOptions({ ...options, label: newValue < 5 ? 5 : newValue })
    //           }}
    //           inputFormat="yyyy-MM-dd"
    //           renderInput={(params) => (
    //             <TextField
    //               {...params}
    //               fullWidth
    //               className={`w-[calc(100%-2*4px)] card flex justify-start my-[1vh] mx-auto shadow-xl ${classes.customTextField}`}
    //             />
    //           )}
    //           // minDate={new Date('2020-02-20')}
    //           // maxDate={new Date('2021-03-30')}
    //         />
    //       </LocalizationProvider>
    //     </>
    //   )
    // }

    return (
      <>
        <div className="w-[40vw] h-[90%] mx-[5vh] my-[2.5vh] flex justify-center">
          <div className="w-[calc(100%-2*4px)] card scroll block">
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={sdate}
                      onChange={(newValue) => {
                        setSdate(moment(newValue).toDate())
                        setOptions({
                          ...options,
                          sdate: newValue
                            ? moment(newValue)
                                .format('YYYY-MM-DD')
                                .replaceAll('-', '')
                            : '',
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
                    />
                  </LocalizationProvider>
                </li>
                <li>
                  End Date
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={edate}
                      onChange={(newValue) => {
                        setEdate(moment(newValue).toDate())
                        setOptions({
                          ...options,
                          edate: newValue
                            ? moment(newValue)
                                .format('YYYY-MM-DD')
                                .replaceAll('-', '')
                            : '',
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
}

export default DownloadOptionModal
