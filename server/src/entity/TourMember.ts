import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Tour } from "./Tour";
import { User } from "./User";

@Entity()
export class TourMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  admin: boolean;

  @OneToOne(() => User, (user) => user.tourMembers)
  @JoinColumn()
  user: User;

  @OneToOne(() => Tour, (tour) => tour.tourMembers, { eager: true })
  @JoinColumn()
  tour: Tour;
}
