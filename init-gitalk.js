const fs = require('fs');
const url = require('url');
const path = require('path');
const axios = require('axios');
const parser = require('fast-xml-parser');
const cheerio = require('cheerio');

const config = {
  username: "felix-fly", // GitHub username, ex: felix-fly
  token: process.env.GITHUB_TOKEN,  // GitHub Token https://github.com/settings/tokens, ex: abcdefg
  repo: "felix-fly.github.io",  // Repo name, ex: felix-fly.github.io
  sitemapUrl: path.resolve(__dirname, "./public/sitemap.xml"),
  kind: "Gitalk",  // "Gitalk" or "Gitment"
};

let isEmpty = false;
Object.keys(config).forEach(key => {
  if (!config[key]) isEmpty = true;
});
if (isEmpty) {
  console.warn('Please check the config items.');
  return;
}

const issuesUrl = `https://api.github.com/repos/${config.username}/${config.repo}/issues?access_token=${config.token}`;

const headers = { "User-Agent": "github-user" };

const getIssues = async (label) => await axios.get(`${issuesUrl}&labels=${label}`, { headers });

const getPage = async (url) => await axios.get(url, { headers });

const setIssue = async (data) => await axios.post(issuesUrl, data, { headers });

const initIssue = async (item) => {
  const label = url.parse(item).path;
  const { data: issues } = await getIssues(label);
  if (issues.length) {
    console.info(`[${item}] Already has issues.`);
    return;
  };
  const page = await getPage(item);
  const title = cheerio.load(page.data)('title').text();
  await setIssue({ body: item, labels: [config.kind, label], title });
  console.info(`[${item}] Initialization complete.`);
};

try {
  console.info('Start...');
  const json = parser.parse(fs.readFileSync(config.sitemapUrl, 'utf8'));
  let urls = json && json.urlset && json.urlset.url;
  // For test: only use two pages
  // urls = json && json.urlset && json.urlset.url && json.urlset.url.slice(0, 2);
  if (!urls || !urls.length) {
    console.info('No links found in the sitemap file.');
    return;
  }

  const days = process.argv[2] || 0;
  if (days) {
    const lastDate = Date.now() - days * 24 * 3600 * 1000;
    urls = urls.filter(item => item.lastmod && new Date(item.lastmod) >= lastDate);
    console.info(`Will process the pages during the last ${days} days.`);
  } else {
    console.info('Will process all pages.');
    console.info('You can pass a days number that will process the pages during the last n days.');
  }

  const total = urls.length;
  if (!total) {
    console.info('Nothing should do.');
    return;
  }
  console.info(`Find ${total} links in the sitemap file.`);
  console.info(`Start init issues, it will spend about ${total + 5} senconds...`);

  let count = 0;
  urls.forEach(item => {
    setTimeout(() => {
      initIssue(item.loc);
    }, count * 1000);
    count++;
  });
  setTimeout(() => {
    console.info('Init issues finished. If occurred some errors, please run it again.');
  }, (count + 5) * 1000);
} catch (e) {
  console.error(e);
}
