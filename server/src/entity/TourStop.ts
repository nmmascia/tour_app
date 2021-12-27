import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
} from "typeorm";
import { TourLocation } from "./TourLocation";
import { TourStopMember } from "./TourStopMember";

@Entity()
export class TourStop {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TourLocation, (tourLocation) => tourLocation.tourStops)
  @JoinColumn()
  tourLocation: TourLocation;

  @OneToMany(
    () => TourStopMember,
    (tourStopMember) => tourStopMember.tourStop,
    { lazy: true, cascade: true, onDelete: "CASCADE" }
  )
  tourStopMembers: Promise<TourStopMember[]>;

  @Column({ type: "timestamptz", nullable: false })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
