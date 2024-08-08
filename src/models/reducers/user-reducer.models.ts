export interface UserReducerResult {
  medal: {
    medalLider: number
    medalGold: number
    medalPlatinum: number
    noMedal: number
  }
  medalByState: {
    [state: string]: number // {BR-SC:}
  }
  state: { [key: string]: string }
}
