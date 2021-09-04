import React from 'react'

import { IconButton } from '@material-ui/core'
import FileDownloadOutlinedIcon from '@material-ui/icons/FileDownloadOutlined'

interface Props {
  onClick?: () => void
}

const DownloadButton: React.VFC<Props> = (props) => {
  return (
    <>
      <div className="max-h-[calc(1024px*60/100)] h-auto">
        <div className="card w-[5vh] min-w-[50px] mr-[calc(5vh+4px)] flex items-center h-auto">
          <IconButton type="submit" aria-label="search" onClick={props.onClick}>
            <FileDownloadOutlinedIcon
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

export default DownloadButton
