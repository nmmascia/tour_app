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
import { TourStop } from "../entity/TourStop";
import { TourStopMember } from "../entity/TourStopMember";

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

    let location = new Location();
    location.name = "John's of Bleecker Street";
    location.address = "278 Bleecker St, New York City, NY 10014-4105";
    location = await manager.save(location);

    let tourLocation = new TourLocation();
    tourLocation.location = location;
    tourLocation.tour = Promise.resolve(tour);
    tourLocation = await manager.save(tourLocation);

    let image = readFileSync(join(__dirname, "../../test/resource/johns.jpeg"));
    let photo = new Photo();
    photo.targetType = "Location";
    photo.targetId = location.id;
    await photo.upload({
      file: image,
      name: "johns.jpeg",
    });
    await manager.save(photo);

    image = readFileSync(join(__dirname, "../../test/resource/pizza_one.jpeg"));
    photo = new Photo();
    photo.targetType = "TourLocation";
    photo.targetId = tourLocation.id;
    photo.description = "Our Pizza";
    await photo.upload({
      file: image,
      name: "pizza_one.jpeg",
    });
    await manager.save(photo);

    image = readFileSync(join(__dirname, "../../test/resource/pizza_two.jpeg"));
    photo = new Photo();
    photo.targetType = "TourLocation";
    photo.targetId = tourLocation.id;
    photo.description = "Our Pizza PT 2";
    await photo.upload({
      file: image,
      name: "pizza_two.jpeg",
    });
    await manager.save(photo);

    let tourStopMember = new TourStopMember();
    tourStopMember.user = user;

    let tourStop = new TourStop();
    tourStop.date = new Date();
    tourStop.tourStopMembers = Promise.resolve([tourStopMember]);
    tourStop.tourLocation = tourLocation;
    await manager.save(tourStop);
  });
};

main();
