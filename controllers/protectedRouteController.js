const protectedRouteToUserHome = (req, res) => {
  res.json("acces to /userHome granted");
};

const protectedRouteToAdminHome = (req, res) => {
  res.json("acces to /adminHome granted");
};

module.exports = { protectedRouteToUserHome, protectedRouteToAdminHome };
