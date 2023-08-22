import React from 'react'

import { showPrescription } from '../actions'

interface ActionButtonBindOptions {
  actionRef?: React.RefObject<HTMLButtonElement>
  patientSet: boolean
  workplaceSet: boolean
}

export default function useActionButtonBind(options: ActionButtonBindOptions): void {
  const { actionRef, patientSet, workplaceSet } = options

  React.useEffect(() => {
    if (actionRef?.current && patientSet && workplaceSet) {
      actionRef.current.addEventListener('click', showPrescription)
    }

    return () => {
      if (actionRef?.current) {
        actionRef?.current.removeEventListener('click', showPrescription)
      }
    }
  }, [actionRef, patientSet, workplaceSet])
}
