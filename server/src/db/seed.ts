import "reflect-metadata";
import { createConnection } from "typeorm";
import { Tour } from "../entity/Tour";
import { TourMember } from "../entity/TourMember";
import { User } from "../entity/User";

const main = async () => {
  const connection = await createConnection();

  let user = new User();
  user.username = "nmmascia";
  user.name = "Nicholas Mascia";
  user = await connection.manager.save(user);

  let tour = new Tour();
  tour.name = "Pizza Tour";
  tour = await connection.manager.save(tour);

  let tourMember = new TourMember();
  tourMember.user = user;
  tourMember.tour = tour;
  tourMember.admin = true;
  await connection.manager.save(tourMember);
};

main();
