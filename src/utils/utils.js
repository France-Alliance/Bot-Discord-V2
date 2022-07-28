import { readdirSync } from 'node:fs';

const searchJSCommand = async (query, res = !1, fn = () => {}) => {
  const folder = readdirSync('./src/' + query),
    filesList = [];

  for (const files of folder) {
    await import(`../${query}/${files}/index.cjs`)
      .then((module) => {
        if (res) filesList.push(module);
        else fn(module);
      })
      .catch((err) => console.error(err));
  }
  if (res) return filesList;
};

export { searchJSCommand };
