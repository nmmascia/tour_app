import { Location } from "../entity/Location";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Tour } from "../entity/Tour";
import { TourLocation } from "../entity/TourLocation";
import { TourMember } from "../entity/TourMember";
import { User } from "../entity/User";
import { readFileSync } from "fs";
import { join } from "path";
import { Photo } from "../entity/Photo";

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
    location.name = "John's of Bleecker Street";
    location.address = "278 Bleecker St, New York City, NY 10014-4105";

    let tourLocation = new TourLocation();
    tourLocation.location = location;
    tourLocation.tour = Promise.resolve(tour);
    await manager.save(tourLocation);

    let image = readFileSync(join(__dirname, "../../test/resource/johns.jpeg"));
    let photo = new Photo();
    photo.targetType = "TourLocation";
    photo.targetId = tourLocation.id;
    await photo.upload({
      file: image,
      name: "John's of Bleecker Street",
    });
    await manager.save(image);
  });
};

main();
