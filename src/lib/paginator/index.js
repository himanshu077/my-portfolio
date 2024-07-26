import { appConfig } from "../appConfig";

export const paginator = (repos, page = 1, count = appConfig.pageCount) => {
  const allRepos = structuredClone(repos);
  const start = (page - 1) * count;
  const end = page * count;
  return allRepos.slice(start, end);
};
