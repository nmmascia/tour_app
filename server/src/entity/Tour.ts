import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { TourLocation } from "./TourLocation";
import { TourMember } from "./TourMember";

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => TourMember, (tourMember) => tourMember.tour, {
    cascade: true,
    onDelete: "CASCADE",
    lazy: true,
  })
  tourMembers: Promise<TourMember[]>;

  @OneToMany(() => TourLocation, (tourLocation) => tourLocation.tour, {
    cascade: true,
    onDelete: "CASCADE",
    lazy: true,
  })
  tourLocations: Promise<TourLocation[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
