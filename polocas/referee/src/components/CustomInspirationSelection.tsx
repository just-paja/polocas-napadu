import { CustomInspirationDialog } from './CustomInspirationDialog.js'
import { Button } from '@polocas/ui/buttons'
import { useState } from 'react'

export const CustomInspirationSelection = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  return (
    <>
      <Button onClick={handleOpen}>Zadat ručně</Button>
      <CustomInspirationDialog open={open} onClose={handleClose} />
    </>
  )
}
