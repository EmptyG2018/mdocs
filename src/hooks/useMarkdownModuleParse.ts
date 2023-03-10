const useMarkdownModuleParse = ({ maxLevel = 2 }) => {
  const regx = new RegExp(
    `^ {0,3}#{1,${maxLevel}} .*(?:(?!^ {0,3}#{1,${maxLevel}} ).*(?:\n+|$))*`,
    "gm"
  );

  const parse = (content: string) => {
    const parsed = content.match(regx);
    return parsed || [];
  };

  return { parse };
};

export default useMarkdownModuleParse;
