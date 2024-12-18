const commonConfig = require('../../gulpfile');

const gulp = require('gulp');
const fs = require('fs');
const fg = require('fast-glob');
const gm = require('gray-matter');
const fse = require('fs-extra');

// 将代码和useToggle下的一个md的第一句话生成一个json中汇总
// metaData.json

async function generateMetaDesc(path) {
  if (!fs.existsSync(path)) {
    return;
  }

  const mdFile = fs.readFileSync(path, 'utf-8');
  const { content } = await gm(mdFile);
  // 找到标题下的第一句话
  let description =
    (content.replace(/\r\n/g, '\n').match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || [])[1] || '';

  description = description.trim();
  description = description.charAt(0).toLowerCase() + description.slice(1);
  return description;
}

async function generateMetaData() {
  const metaData = {
    functions: [],
  };

  const hooks = fg
    .sync('src/use*', {
      onlyDirectories: true,
    })
    .map((hook) => hook.replace('src/', ''))
    .sort();

  await Promise.allSettled(
    hooks.map(async (hook) => {
      // 要生成对应的desc
      const description = await generateMetaDesc(`src/${hook}/index.md`);
      return {
        name: hook,
        description,
      };
    }),
  ).then((res) => {
    metaData.functions = res.map((item) => {
      if (item.status === 'fulfilled') {
        return item.value;
      }
      return null;
    });
  });
  return metaData;
}

gulp.task('metadata', async () => {
  // 生成对象
  const metaData = await generateMetaData();
  // 写入文件里
  await fse.writeJson('metadata.json', metaData, { spaces: 2 });
});
exports.default = gulp.series(commonConfig.default, 'metadata');
