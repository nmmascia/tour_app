import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  getRepository,
} from "typeorm";
import { Location } from "./Location";
import { Photo } from "./Photo";
import { Tour } from "./Tour";

@Entity()
export class TourLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "jsonb", nullable: false })
  location: Location;

  @OneToOne(() => Tour, (tour) => tour.tourLocations, { lazy: true })
  @JoinColumn()
  tour: Promise<Tour>;

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
