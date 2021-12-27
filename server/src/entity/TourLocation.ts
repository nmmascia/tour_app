import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  getRepository,
  OneToMany,
} from "typeorm";
import { Location } from "./Location";
import { Photo } from "./Photo";
import { Tour } from "./Tour";
import { TourStop } from "./TourStop";

@Entity()
export class TourLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Location, (location) => location.tourLocation, {
    eager: true,
  })
  @JoinColumn()
  location: Location;

  @OneToOne(() => Tour, (tour) => tour.tourLocations, { lazy: true })
  @JoinColumn()
  tour: Promise<Tour>;

  @OneToMany(() => TourStop, (tourStop) => tourStop.tourLocation, {
    lazy: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  tourStops: Promise<TourStop[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async photos(): Promise<Photo[]> {
    return await getRepository(Photo)
      .createQueryBuilder("photo")
      .where("photo.targetId = :id")
      .setParameters({
        id: this.id,
      })
      .getMany();
  }
}
