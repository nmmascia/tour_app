import { Location } from "../entity/Location";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Tour } from "../entity/Tour";
import { TourLocation } from "../entity/TourLocation";
import { TourMember } from "../entity/TourMember";
import { User } from "../entity/User";

const main = async () => {
  const connection = await createConnection();

  await connection.transaction(async (manager) => {
    let user = new User();
    user.username = "nmmascia";
    user.name = "Nicholas Mascia";
    user = await manager.save(user);

    let tour = new Tour();
    tour.name = "Pizza Tour";
    tour = await manager.save(tour);

    let tourMember = new TourMember();
    tourMember.user = Promise.resolve(user);
    tourMember.tour = Promise.resolve(tour);
    tourMember.admin = true;
    await manager.save(tourMember);

    const location = new Location();
    location.name = "Lorenzo's Pizzeria";
    location.address = "90 Fair St";

    let tourLocation = new TourLocation();
    tourLocation.location = location;
    tourLocation.tour = Promise.resolve(tour);
    await manager.save(tourLocation);
  });
};

main();
