import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  getRepository,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;

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
      .andWhere("photo.targetType = :targetType", { targetType: "Location" })
      .getOne();
  }
}
