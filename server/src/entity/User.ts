import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  getRepository,
} from "typeorm";

import { Photo } from "./Photo";
import { TourMember } from "./TourMember";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @OneToMany(() => TourMember, (tourMember) => tourMember.user, { lazy: true })
  tourMembers: Promise<TourMember[]>;

  @Column()
  name?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async avatar(): Promise<Photo> {
    return await getRepository(Photo)
      .createQueryBuilder("photo")
      .where("photo.targetId = :targetId", {
        targetId: this.id,
      })
      .andWhere("photo.targetType = :targetType", { targetType: "User" })
      .getOne();
  }
}
