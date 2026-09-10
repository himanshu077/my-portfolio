import { appEnvs } from "./env";

// Any image dropped into src/assets/thumbnails/ named after the project id
// (for json projects) or repo name (for GitHub projects) is picked up
// automatically, e.g. src/assets/thumbnails/orqestra.png
const localThumbnails = (() => {
  try {
    const ctx = require.context(
      "../assets/thumbnails",
      false,
      /\.(png|jpe?g|webp|gif|svg)$/i
    );
    return ctx.keys().reduce((acc, key) => {
      const name = key.replace(/^\.\//, "").replace(/\.[^.]+$/, "");
      acc[name.toLowerCase()] = ctx(key);
      return acc;
    }, {});
  } catch (e) {
    return {};
  }
})();

export const getLocalThumbnail = (id) =>
  id ? localThumbnails[String(id).toLowerCase()] : undefined;

/**
 * Ordered list of candidate thumbnail URLs for a project. The card tries them
 * in order and falls back to a generated placeholder when all fail.
 */
export const getThumbnailSources = (project) => {
  if (!project) return [];
  const isGithubRepo = Boolean(project.default_branch);
  const key = isGithubRepo ? project.name : project.id;
  const sources = [getLocalThumbnail(key)];

  if (isGithubRepo) {
    const user = appEnvs.REACT_APP_GITHUB_USERNAME;
    sources.push(
      `https://raw.githubusercontent.com/${user}/${project.name}/main/logo.png`,
      `https://opengraph.githubassets.com/1/${user}/${project.name}`
    );
  } else {
    sources.push(project.poster?.src);
    const repo = (project.project_link || "").match(
      /github\.com\/([^/]+\/[^/#?]+)/
    );
    if (repo) sources.push(`https://opengraph.githubassets.com/1/${repo[1]}`);
  }

  return [...new Set(sources.filter(Boolean))];
};

export const getPrimaryThumbnail = (project) =>
  getThumbnailSources(project)[0];
