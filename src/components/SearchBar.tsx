import React, { useContext, useState } from 'react'

import { Chip, Autocomplete, TextField, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles, createStyles } from '@material-ui/styles'

import { hashtagsContext } from '../hooks/useHashtagsContext'

const useStyles = makeStyles(() =>
  createStyles({
    customChip: {
      color: '#707070 !important',
      fontWeight: 'bold',
      backgroundColor: '#333D4D !important',
      '--tw-shadow':
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.2) !important',
      boxShadow:
        'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important',
      margin: '0 .125rem !important',
      transition: '.25s !important',
      '&:hover': {
        color: '#909090 !important',
      },
    },
    customTextField: {
      '& input': {
        color: '#707070 !important',
      },
      '& label': {
        color: '#707070',
      },
      '& label.Mui-focused, label.MuiInputLabel-shrink': {
        backgroundColor: '#333440',
        color: '#707070',
        padding: '.125rem .5rem',
        borderRadius: '10px',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
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
  }),
)

const SearchBar: React.VFC = () => {
  const classes = useStyles()

  const [tags, setTags] = useState<string[]>()

  const hashtags = useContext(hashtagsContext)
  const setHashtags = () => {
    if (tags) {
      hashtags.setHashtagsContext(tags.join('|'))
    }
  }

  return (
    <>
      <div className="h-[5vw] max-h-[calc(1024px*60/100)] mx-[5vh] my-[2.5vh]">
        <div className="w-[calc(100%-2*4px)] card flex items-center">
          <Autocomplete
            multiple
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                /* eslint-disable */
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  className={classes.customChip}
                />
              ))
            }
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                type="search"
                label="Hashtag"
                className={classes.customTextField}
              />
            )}
            onChange={(_, value) => {
              setTags(value)
            }}
          />
          <IconButton type="submit" aria-label="search" onClick={setHashtags}>
            <SearchIcon
              sx={{
                color: '#707070',
              }}
            />
          </IconButton>
        </div>
      </div>
    </>
  )
}

export default SearchBar
