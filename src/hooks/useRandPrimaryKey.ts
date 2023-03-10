// 随机生成唯一标识
const useRandPrimaryKey = ({ type = "key" }) => {
  const rand = (index: number) => {
    return (
      type +
      "_" +
      new Date().getTime() +
      "-" +
      index +
      "-" +
      (Math.round(Math.random() * 10000) + "").padStart(5, "0")
    );
  };

  return { rand };
};

export default useRandPrimaryKey;
