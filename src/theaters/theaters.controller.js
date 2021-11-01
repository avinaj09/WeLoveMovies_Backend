const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");
const theatersService = require("./theaters.service");

async function list(req, res) {
  const theaters = await theatersService.list();
  const theatersAndMovies = [];
  for (let i = 0; i < theaters.length; i++) {
    const theater = theaters[i];
    const { theater_id } = theater;
    const movies = await theatersService.getMovies(theater_id);
    const TM = { ...theater, movies: movies };
    theatersAndMovies.push(TM);
  }
  res.status(200).json({ data: theatersAndMovies });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};