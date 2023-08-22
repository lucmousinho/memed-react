import { MdHubNotInitializedError } from '../errors'
import { Workplace } from 'src/domain/Workplace'

export default async function setMemedWorkplace(workplace: Workplace): Promise<void> {
  if (!('MdHub' in window)) {
    throw MdHubNotInitializedError
  }

  const { city, state, cnes, local_name, address, phone } = workplace
  await window.MdHub.command.send('plataforma.prescricao', 'setWorkplace', {
    city, 
    state, 
    cnes, 
    local_name, 
    address,
    phone
  })
}
