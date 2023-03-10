import { useEffect } from "react";

const IndexedDB = () => {
  useEffect(() => {
    const dbInstace = indexedDB.open("mdocs-db", 1);

    dbInstace.onerror = (e) => {
      console.log("open error：", e);
    };

    dbInstace.onupgradeneeded = (e) => {
      const db = e.target.result;
      db.createObjectStore("mdocs-resources", {
        keyPath: "id",
      });
    };

    dbInstace.onsuccess = (e) => {
      const db = event.target.result;

      // 在事务中读写数据
      const objectStore = db
        .transaction(["mdocs-resources"], "readwrite")
        .objectStore("mdocs-resources");

      // 添加数据到object store
      const customer = {
        idg: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      };

      let a = objectStore.add(customer);

      a.onsuccess = function (event) {
        console.log("数据已添加到数据库中");
      };

      return;

      // 从object store中获取数据
      const index = objectStore.index("name");
      let b = index.get("John Doe");

      b.onsuccess = function (event) {
        console.log("获取的数据：", event.target.result);
      };
    };
  });

  return <div>this is demo.</div>;
};

export default IndexedDB;
