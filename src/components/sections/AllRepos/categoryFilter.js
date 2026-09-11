const categoriesOf = (project) => project?.localInfo?.category ?? [];

export const filterProjectsByCategory = (projects, category) => {
  return projects.filter((project) => {
    if (category === "All") return true;

    return categoriesOf(project).includes(category);
  });
};

/**
 * How many projects sit in each category. A project may belong to several, so
 * the counts deliberately sum to more than the number of projects.
 */
export const countProjectsByCategory = (projects) => {
  const counts = {};
  for (const project of projects) {
    for (const category of categoriesOf(project)) {
      counts[category] = (counts[category] ?? 0) + 1;
    }
  }
  return counts;
};

/**
 * Category names paired with their project count, in the order the data
 * declares them. Categories that no project uses are dropped so the control
 * never offers a filter that resolves to an empty grid. "All" is always kept.
 */
export const buildCategoryOptions = (categories = [], projects = []) => {
  const counts = countProjectsByCategory(projects);

  return categories
    .filter((category) => category.enabled !== false)
    .map((category) => ({
      name: category.name,
      count: category.name === "All" ? projects.length : counts[category.name] ?? 0,
    }))
    .filter((option) => option.name === "All" || option.count > 0);
};
