import React from 'react'

import { Workplace } from '../domain'
import { setMemedWorkplace } from '../actions'

interface SetupWorkplaceParams {
  workplace?: Workplace
  prescriptionLoaded: boolean
}

interface SetupWorkplaceResult {
  workplaceSet: boolean
}

export default function useSetupWorkplace(params: SetupWorkplaceParams): SetupWorkplaceResult {
  const { workplace, prescriptionLoaded } = params

  const [workplaceSet, setWorkplaceSet] = React.useState(false)

  React.useEffect(() => {
    if (workplace && prescriptionLoaded) {
      setMemedWorkplace(workplace).then(() => {
        setWorkplaceSet(true)
      })
    }
  }, [workplace, prescriptionLoaded])

  return { workplaceSet }
}