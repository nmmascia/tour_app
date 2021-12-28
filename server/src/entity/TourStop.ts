import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { TourLocation } from "./TourLocation";
import { TourStopMember } from "./TourStopMember";

@Entity()
export class TourStop {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TourLocation, (tourLocation) => tourLocation.tourStops, {
    onDelete: "CASCADE",
  })
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
