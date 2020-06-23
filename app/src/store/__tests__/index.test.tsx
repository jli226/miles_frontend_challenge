import { Store } from "..";
import { toJS } from "mobx";

describe("Store", () => {
  it("should change the rewardCategoryMap according to the add, delete, move actions", () => {
    let store = new Store();
    expect(toJS(store.rewardCategoryMap)).toEqual({});
    store.add("R1", "C1");
    expect(toJS(store.rewardCategoryMap)).toEqual({ R1: ["C1"] });
    store.add("R1", "C1");
    expect(toJS(store.rewardCategoryMap)).toEqual({ R1: ["C1"] });
    store.add("R1", "C2");
    expect(toJS(store.rewardCategoryMap)).toEqual({ R1: ["C1", "C2"] });
    store.delete("R1", "C2");
    expect(toJS(store.rewardCategoryMap)).toEqual({ R1: ["C1"] });
    store.delete("R1", "C1");
    expect(toJS(store.rewardCategoryMap)).toEqual({ R1: [] });
    store.rewardCategoryMap.clear();
    expect(toJS(store.rewardCategoryMap)).toEqual({});
    store.add("R2", "C1");
    store.add("R2", "C2");
    expect(toJS(store.rewardCategoryMap)).toEqual({ R2: ["C1", "C2"] });
    store.move("R2", "C1", "C5");
    expect(toJS(store.rewardCategoryMap)).toEqual({ R2: ["C2", "C5"] });
    store.move("R2", "C1", "C5");
    expect(toJS(store.rewardCategoryMap)).toEqual({ R2: ["C2", "C5"] });
  });
});
