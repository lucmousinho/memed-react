export interface Patient {
  nome: string
  endereco: string
  cidade: string
  telefone: string
  peso?: number
  altura?: number
  idExterno: string
  cpf: string
  withoutCpf?: boolean
  data_nascimento?: string
}
