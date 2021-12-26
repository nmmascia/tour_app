import { Column } from "typeorm";

export class Location {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;
}
