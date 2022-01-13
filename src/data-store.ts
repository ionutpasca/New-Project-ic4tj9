import { useState, useEffect } from "react";
import { Subject } from "https://jspm.dev/subjecto";

Subject.prototype.hook = function () {
  const [value, setValue] = useState(this.value);
  useEffect(() => this.subscribe(setValue).unsubscribe, []);
  return value;
};

const store = {
  value: new Subject(""),
  count: new Subject(0),
};

const increment = () => {
  store.count.next(store.count.value + 1);
  setTimeout(increment, 1000);
};

increment();

export default store;
