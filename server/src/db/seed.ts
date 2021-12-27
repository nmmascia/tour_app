import "reflect-metadata";

import * as Faker from "faker";

import { Location } from "../entity/Location";
import { Photo } from "../entity/Photo";
import { Tour } from "../entity/Tour";
import { TourLocation } from "../entity/TourLocation";
import { TourMember } from "../entity/TourMember";
import { TourStop } from "../entity/TourStop";
import { TourStopMember } from "../entity/TourStopMember";
import { User } from "../entity/User";
import { createConnection } from "typeorm";
import { join } from "path";
import { readFileSync } from "fs";

const createUser = () => {
  const user = new User();
  user.username = "dwallace";
  user.name = "David Wallace";
  return user;
};

const tours = [
  {
    id: "pizza_tour",
    name: "Pizza Tour",
    locations: [
      {
        name: "John's of Bleecker Street",
        address: "278 Bleecker St, New York City, NY 10014",
      },
    ],
  },
  {
    id: "bbq_tour",
    name: "BBQ Tour",
    locations: [
      {
        name: "Franklin Barbecue",
        address: "900 E 11th St, Austin, TX 78702",
      },
    ],
  },
];

const main = async () => {
  const connection = await createConnection();
  const { manager } = connection;
  // await connection.transaction(async (manager) => {
  let user = createUser();
  user = await manager.save(user);

  let image = readFileSync(
    join(__dirname, `../../test/resource/user_one.jpeg`)
  );
  let photo = new Photo();
  photo.targetType = "User";
  photo.targetId = user.id;
  await photo.upload({
    file: image,
    name: "user_one.jpeg",
  });
  await manager.save(photo);

  tours.forEach(async (t) => {
    let tour = new Tour();
    tour.name = t.name;
    tour = await manager.save(tour);

    let tourMember = new TourMember();
    tourMember.user = Promise.resolve(user);
    tourMember.tour = Promise.resolve(tour);
    tourMember.admin = true;
    await manager.save(tourMember);

    t.locations.forEach(async (l) => {
      let location = new Location();
      location.name = l.name;
      location.address = l.address;
      location = await manager.save(location);

      let tourLocation = new TourLocation();
      tourLocation.location = location;
      tourLocation.tour = Promise.resolve(tour);
      tourLocation = await manager.save(tourLocation);

      let image = readFileSync(
        join(__dirname, `../../test/resource/${t.id}/location.jpeg`)
      );
      let photo = new Photo();
      photo.targetType = "Location";
      photo.targetId = location.id;
      await photo.upload({
        file: image,
        name: "location.jpeg",
      });
      await manager.save(photo);

      image = readFileSync(
        join(__dirname, `../../test/resource/${t.id}/image_one.jpeg`)
      );
      photo = new Photo();
      photo.targetType = "TourLocation";
      photo.targetId = tourLocation.id;
      photo.description = Faker.random.words(31);
      await photo.upload({
        file: image,
        name: "image_one.jpeg",
      });
      await manager.save(photo);

      image = readFileSync(
        join(__dirname, `../../test/resource/${t.id}/image_two.jpeg`)
      );
      photo = new Photo();
      photo.targetType = "TourLocation";
      photo.targetId = tourLocation.id;
      photo.description = Faker.random.words(150);
      await photo.upload({
        file: image,
        name: "image_two.jpeg",
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
  });
  // });
};

main();
