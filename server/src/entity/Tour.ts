import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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
  })
  tourMembers: TourMember[];
}
