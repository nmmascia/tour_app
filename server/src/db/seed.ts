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

const createUsers = async (manager) => {
  const users = [
    {
      username: "david_wallace",
      name: "David Wallace",
      imageName: "d_wallace.jpeg",
      image: readFileSync(
        join(__dirname, "../../test/resource/images/users/d_wallace.jpeg")
      ),
    },
    {
      username: "little_kid_lover",
      name: "Michael Scott",
      imageName: "m_scott.jpeg",
      image: readFileSync(
        join(__dirname, "../../test/resource/images/users/m_scott.jpeg")
      ),
    },
    {
      username: "whupf_guy",
      name: "Ryan Howard",
      imageName: "r_howard.jpeg",
      image: readFileSync(
        join(__dirname, "../../test/resource/images/users/r_howard.jpeg")
      ),
    },
  ];

  const result = await manager.save(
    users.map((usr) => {
      const user = new User();
      user.username = usr.username;
      user.name = usr.name;
      return user;
    })
  );

  users.forEach(async ({ image, imageName }, index) => {
    let photo = new Photo();
    photo.targetType = "User";
    photo.targetId = result[index].id;
    await photo.upload({
      file: image,
      name: imageName,
    });
    await manager.save(photo);
  });

  return result;
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
  const [user] = await createUsers(manager);

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
        join(__dirname, `../../test/resource/images/${t.id}/location.jpeg`)
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
        join(__dirname, `../../test/resource/images/${t.id}/image_one.jpeg`)
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
        join(__dirname, `../../test/resource/images/${t.id}/image_two.jpeg`)
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
