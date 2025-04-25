export interface Badge {
  id: string
  name: string
  description: string
  image: string
  rarity: string
  dateEarned?: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
  owned: boolean
}
