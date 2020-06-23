import { observable, action } from "mobx"

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
    @observable
    rewardCategoryMap = new Map<string, Set<string>>()

    @observable
    rewards = REWARDS

    @observable
    categories = CATEGORIES

    getCategorySet = (reward: string) => {
        return this.rewardCategoryMap.get(reward) || new Set()
    }

    @action
    add = (reward: string, category: string) => {
        console.log('add', { reward, category });
        const set = this.getCategorySet(reward)
        set.add(category)
        this.rewardCategoryMap.set(reward, set)
    }

    @action
    delete = (reward: string, category: string) => {
        console.log('delete', { reward, category });
        const set = this.getCategorySet(reward)
        set.delete(category)
        this.rewardCategoryMap.set(reward, set)
    }

    @action
    move = (reward: string, srcCategory: string, destCategory: string) => {
        this.delete(reward, srcCategory)
        this.add(reward, destCategory)
    }
}
