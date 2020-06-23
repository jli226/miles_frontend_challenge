import { observable, action, toJS, computed } from "mobx";

const REWARDS = ["R1", "R2", "R3", "R4", "R5"];

const CATEGORIES = ["C1", "C2", "C3", "C4", "C5"];

const jsonStrToMap = (state: string) => {
  try {
    const obj: { [key: string]: string[] } = JSON.parse(state);
    const newObjWithSet: { [key: string]: Set<string> } = {};
    for (const [key, value] of Object.entries(obj)) {
      newObjWithSet[key] = new Set(value);
    }
    return newObjWithSet;
  } catch (e) {
    console.error(e);
    return {};
  }
};

const persistMap = (state: string) => {
  localStorage.setItem("rewardCategoryMap", state);
};

export class Store {
  constructor() {
    const data = localStorage.getItem("rewardCategoryMap");
    if (!data) {
      return;
    }
    const map = jsonStrToMap(data);
    this.rewardCategoryMap.replace(map);
    this.autoSave = Boolean(localStorage.getItem("autoSave"));
  }

  rewardCategoryMap = observable.map({});

  @observable
  rewards = REWARDS;

  @observable
  categories = CATEGORIES;

  @observable
  history: any[] = [];

  @observable
  index = -1;

  @observable
  autoSave = false;

  @computed
  get canUndo() {
    return this.history.length > 0 && (this.index === -1 || this.index > 0);
  }

  @computed
  get canRedo() {
    return this.index >= 0 && this.index + 1 < this.history.length;
  }

  @action
  save = () => {
    persistMap(JSON.stringify(toJS(this.rewardCategoryMap)));
  };

  @action
  toggleAutoSave = () => {
    this.autoSave = !this.autoSave;
    localStorage.setItem("autoSave", this.autoSave ? "1" : "");
  };

  restoreFromIndex = () => {
    if (this.index < 0 || this.index + 1 > this.history.length) {
      return;
    }
    const state = this.history[this.index];
    this.rewardCategoryMap.replace(jsonStrToMap(state));
    if (this.autoSave) {
      persistMap(state);
    }
  };

  @action
  undo = () => {
    if (!this.canUndo) {
      return;
    }
    if (this.index === -1) {
      this.index = this.history.length - 1;
    }
    this.index -= 1;
    this.restoreFromIndex();
  };

  @action
  redo = () => {
    if (!this.canRedo) {
      return;
    }
    this.index += 1;
    this.restoreFromIndex();
  };

  getCategorySet = (reward: string) => {
    return this.rewardCategoryMap.get(reward) || new Set();
  };

  pushHistory = () => {
    if (this.index !== -1) {
      this.history.splice(this.index + 1);
      this.index = -1;
    }
    const curState = JSON.stringify(toJS(this.rewardCategoryMap));
    this.history.push(curState);
    if (this.autoSave) {
      persistMap(curState);
    }
  };

  ensureStoreHistory = () => {
    if (!this.history.length) {
      this.pushHistory();
    }
  };

  @action
  add = (reward: string, category: string) => {
    this.ensureStoreHistory();
    const set = this.getCategorySet(reward);
    set.add(category);
    this.rewardCategoryMap.set(reward, set);
    this.pushHistory();
  };

  @action
  delete = (reward: string, category: string) => {
    this.ensureStoreHistory();
    const set = this.getCategorySet(reward);
    set.delete(category);
    this.rewardCategoryMap.set(reward, set);
    this.pushHistory();
  };

  @action
  move = (reward: string, srcCategory: string, destCategory: string) => {
    this.ensureStoreHistory();
    const set = this.getCategorySet(reward);
    set.delete(srcCategory);
    set.add(destCategory);
    this.rewardCategoryMap.set(reward, set);
    this.pushHistory();
  };
}
