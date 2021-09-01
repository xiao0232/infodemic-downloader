import React from 'react'

import Modal from '@material-ui/core/Modal'

import DownloadButton from './DownloadButton'
import DownloadOptionModal from './DownloadOptionModal'

const Downloader: React.VFC = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <DownloadButton onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'middle',
        }}
      >
        <DownloadOptionModal />
      </Modal>
    </>
  )
}

export default Downloader
