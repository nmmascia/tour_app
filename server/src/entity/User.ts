import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TourMember } from "./TourMember";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @OneToMany(() => TourMember, (tourMember) => tourMember.user, { eager: true })
  tourMembers: TourMember[];

  @Column()
  name?: string;
}
