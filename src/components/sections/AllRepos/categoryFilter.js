export const filterProjectsByCategory = (projects, category) => {
  return projects.filter((project) => {
    if (category === "All") return true;

    const projectCategory = project.localInfo.category;
    return projectCategory.includes(category);
  });
};
