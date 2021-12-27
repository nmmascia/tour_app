import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  getRepository,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Photo } from "./Photo";
import { TourLocation } from "./TourLocation";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;

  @OneToOne(() => TourLocation, (tourLocation) => tourLocation.location)
  tourLocation: TourLocation;

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
