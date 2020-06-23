import { observable } from "mobx"

const REWARDS = [
  'R1',
  'R2',
  'R3',
  'R4',
  'R5',
]

const CATEGORIES = [
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
]

export class Store {
    id = Math.random()
    @observable title = ""
    @observable finished = false

    @observable
    rewards = REWARDS

    @observable
    categories = CATEGORIES
}
