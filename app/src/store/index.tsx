import { observable, action, toJS, computed } from "mobx"

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
    constructor () {
        // TODO: add initial state to history
    }

    rewardCategoryMap = observable.map({})

    @observable
    rewards = REWARDS

    @observable
    categories = CATEGORIES

    @observable
    history: any[] = []

    @observable
    index = -1

    @computed
    get canUndo () {
        return this.history.length > 0 && (this.index === -1 || this.index > 0)
    }

    @computed
    get canRedo () {
        return (this.index >= 0 && this.index + 1 < this.history.length)
    }

    restoreFromIndex = () => {
        if (this.index < 0 || this.index + 1 > this.history.length) {
            return
        }
        const state = this.history[this.index]
        const obj: { [key:string]: string[] } = JSON.parse(state)
        const newObjWithSet: { [key:string]: Set<string> } = {}
        for (const [key, value] of Object.entries(obj)) {
            newObjWithSet[key] = new Set(value)
        }
        this.rewardCategoryMap.replace(newObjWithSet)
    }

    @action
    undo = () => {
        if (!this.canUndo) {
            return
        }
        if (this.index === -1) {
            this.index = this.history.length - 1
        }
        this.index -= 1
        this.restoreFromIndex()
    }

    @action
    redo = () =>{
        if (!this.canRedo) {
            return
        }
        this.index += 1
        this.restoreFromIndex()
    }

    getCategorySet = (reward: string) => {
        return this.rewardCategoryMap.get(reward) || new Set()
    }

    pushHistory = () => {
        if (this.index !== -1) {
            this.history.splice(this.index)
            this.index = -1
        }
        const curState = JSON.stringify(toJS(this.rewardCategoryMap))
        this.history.push(curState)
    }

    ensureStoreHistory = () => {
        if (!this.history.length) {
            this.pushHistory()
        }
    }

    @action
    add = (reward: string, category: string) => {
        this.ensureStoreHistory()
        const set = this.getCategorySet(reward)
        set.add(category)
        this.rewardCategoryMap.set(reward, set)
        this.pushHistory()
    }

    @action
    delete = (reward: string, category: string) => {
        this.ensureStoreHistory()
        console.log('delete', { reward, category });
        const set = this.getCategorySet(reward)
        set.delete(category)
        this.rewardCategoryMap.set(reward, set)
        this.pushHistory()
    }

    @action
    move = (reward: string, srcCategory: string, destCategory: string) => {
        this.ensureStoreHistory()
        const set = this.getCategorySet(reward)
        set.delete(srcCategory)
        set.add(destCategory)
        this.rewardCategoryMap.set(reward, set)
        this.pushHistory()
    }
}
