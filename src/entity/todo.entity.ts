import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TodoStatus } from "../constants/enums";

@Entity("P_Todo")
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, name: "Name", nullable: false })
  name: string;

  @Column({ type: "text", name: "ShortDescription", nullable: false })
  shortDescription: string;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
    name: "DateAndTime",
  })
  dateAndTime: Date;

  @Column({
    type: "enum",
    enum: TodoStatus,
    default: TodoStatus.Upcoming,
    nullable: false,
    name: "Status",
  })
  status: TodoStatus;
}
