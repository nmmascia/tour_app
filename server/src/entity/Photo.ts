import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import storageClient from "../storage/client";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  targetType: string;

  @Column()
  targetId: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async upload({ file, name }: { file: Buffer; name: string }) {
    try {
      const { Location } = await storageClient
        .upload({
          Bucket: process.env.STORAGE_BUCKET,
          Key: `${this.targetType}/${this.targetId}/${name}`,
          Body: file,
          Metadata: {
            mime: "image/jpeg",
          },
        })
        .promise();

      this.name = name;
      this.url = Location;
    } catch (error) {
      console.warn(error);
    }
  }
}
