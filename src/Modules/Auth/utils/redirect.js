export const isValidToRedirect = (routeName) => {
  console.log(routeName);
  const validRedirectRoutes = [
    "home",
    "owner",
    "tenants",
    "about",
    "questions",
    "how-it-works",
    "posts",
    "terms",
  ];
  if (validRedirectRoutes.includes(routeName)) return true;
};
