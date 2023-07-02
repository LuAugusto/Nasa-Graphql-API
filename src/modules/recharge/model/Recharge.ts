import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Recharge {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  stationId: string;

  @Field((type) => ID)
  userId: string;

  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field()
  status: string;

  @Field()
  reservation: boolean;
}
