import React, { useContext, useState } from 'react'

import { Chip, Autocomplete, TextField, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles, createStyles } from '@material-ui/styles'

import { hashtagsContext } from '../hooks/useHashtagsContext'

const useStyles = makeStyles(() =>
  createStyles({
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
      <div className="h-[10vh] max-h-[calc(1024px*60/100)] mx-[5vh] my-[2.5vh]">
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
                  className="text-font-gray text-base font-bold bg-dark-column shadow-xl m-1"
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
            <SearchIcon className="text-font-gray" />
          </IconButton>
        </div>
      </div>
    </>
  )
}

export default SearchBar
