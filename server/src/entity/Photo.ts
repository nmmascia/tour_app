import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import storageClient from "../storage/client";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  targetType: string;

  @Column()
  targetId: number;

  @Column()
  url: string;

  async upload({ file, name }: { file: Buffer; name: string }) {
    try {
      const { Location } = await storageClient
        .upload({
          Bucket: process.env.STORAGE_BUCKET,
          Key: `${this.targetType}/${this.targetId}/${name}`,
          Body: file,
        })
        .promise();

      this.url = Location;
    } catch (error) {
      console.warn(error);
    }
  }
}
