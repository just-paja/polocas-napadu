import type { ClassName } from '@polocas/core/generics'

import { AddIcon, FoulIcon } from '@polocas/ui/icons'
import { PenaltyDialog } from './PenaltyDialog.js'
import { SpeedDial } from '@polocas/ui/dialogs'
import { useState } from 'react'

interface MatchSpeedDialProps {
  className?: ClassName
  label?: string
}

export function MatchSpeedDial({ className, label }: MatchSpeedDialProps) {
  const [showPenaltyDialog, setShowPenaltyDialog] = useState(false)
  const handlePenaltyDialogClose = () => setShowPenaltyDialog(false)
  const handlePenaltyDialogOpen = () => setShowPenaltyDialog(true)
  return (
    <>
      <SpeedDial
        icon={<AddIcon />}
        title={label || 'Přidat'}
        className={className}
      >
        <SpeedDial.Item
          icon={<FoulIcon />}
          onClick={handlePenaltyDialogOpen}
          title='Trestný bod'
        />
      </SpeedDial>
      <PenaltyDialog
        open={showPenaltyDialog}
        onClose={handlePenaltyDialogClose}
      />
    </>
  )
}
