import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
@ObjectType()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field(() => String)
  @Column()
  filename: string;

  @Field(() => String)
  @Column()
  mimetype: string;

  @Field(() => String)
  @Column()
  encoding: string;

  @Field(() => String)
  @Column()
  url: string;
}
