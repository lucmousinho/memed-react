import React from 'react'

import { ModuleOptions, Patient, Workplace } from '../domain'
import { useScriptLoader, useSetupCommands, useActionButtonBind, useSetupPatient, useSetupWorkplace } from '../hooks'
import MemedContext from '../contexts/MemedContext'

import { cleanUp, showPrescription, hidePrescription } from '../actions'

interface MemedContextProviderProps {
  children: React.ReactNode
  color?: string
  scriptSrc?: string
  scriptId?: string
}

export default function MemedProvider(props: MemedContextProviderProps): React.ReactElement {
  const {
    children,
    color = '#00B8D6',
    scriptSrc = 'https://sandbox.memed.com.br/modulos/plataforma.sinapse-prescricao/build/sinapse-prescricao.min.js',
    scriptId = 'memedScript'
  } = props

  const [doctorToken, setDoctorToken] = React.useState('')
  const [patient, setPatient] = React.useState<Patient>()
  const [workplace, setWorkplace] = React.useState<Workplace>()
  const [actionRef, setActionRef] = React.useState<React.RefObject<HTMLButtonElement>>()
  const [options, setOptions] = React.useState<ModuleOptions>()

  const { prescriptionLoaded } = useScriptLoader({
    doctorToken,
    color,
    scriptSrc,
    scriptId
  })

  const { patientSet } = useSetupPatient({ patient, prescriptionLoaded })

  const { workplaceSet } = useSetupWorkplace({ workplace, prescriptionLoaded })

  useSetupCommands({ options, prescriptionLoaded })

  useActionButtonBind({ patientSet, workplaceSet, actionRef })

  const onLogout = React.useCallback(() => {
    if (prescriptionLoaded) {
      cleanUp(scriptId)
    }
  }, [scriptId, prescriptionLoaded])

  const loadingModule = React.useMemo(() => !prescriptionLoaded || !patientSet || !workplaceSet, [prescriptionLoaded, patientSet, workplaceSet])

  const contextValue = React.useMemo(
    () => ({
      setDoctorToken,
      setPatient,
      setWorkplace,
      setActionRef,
      onLogout,
      loadingModule,
      showPrescription,
      hidePrescription,
      setOptions
    }),
    [onLogout, loadingModule]
  )

  return <MemedContext.Provider value={contextValue}>{children}</MemedContext.Provider>
}
