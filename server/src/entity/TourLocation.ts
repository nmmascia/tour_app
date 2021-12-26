import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Location } from "./Location";
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
}
