const protectedRouteToHome = (req, res) => {
  res.json("acces to /home granted");
};

module.exports = { protectedRouteToHome };
