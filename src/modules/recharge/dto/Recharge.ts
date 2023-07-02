import { Field, ID, InputType, ObjectType } from "type-graphql";

enum Status {
  PENDING = "pending",
  COMPLETED = "completed",
  IN_PROGRESS = "in_progress",
  RESERVATION = "reservation",
}

@InputType()
class RechargeInput {
  @Field((type) => ID)
  stationId: string;

  @Field((type) => ID)
  userId: string;

  @Field()
  end: Date;
}

@InputType()
class RechargeByReservationIdInput {
  @Field((type) => ID)
  reservationId: string;
}

@InputType()
class RechargeByIdInput {
  @Field((type) => ID)
  id: string;

  @Field()
  status: string;
}

@ObjectType()
class RechargeByIdOutput {
  @Field((type) => ID)
  id: string;

  @Field()
  status: string;
}

@InputType()
class RechargeReservationInput {
  @Field((type) => ID)
  stationId: string;

  @Field((type) => ID)
  userId: string;

  @Field()
  end: Date;

  @Field()
  start: Date;
}

@ObjectType()
class RechargeReservationOutput {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  stationId: string;

  @Field((type) => ID)
  userId: string;

  @Field()
  end: Date;

  @Field()
  start: Date;

  @Field()
  status: string;

  @Field()
  reservation: boolean;
}

@ObjectType()
class RechargeOutput {
  @Field((type) => ID)
  stationId: string;

  @Field((type) => ID)
  userId: string;

  @Field()
  end: Date;

  @Field()
  start: Date;

  @Field()
  status: string;
}

@InputType()
class RechargelistByStationInput {
  @Field((type) => ID)
  id: string;
}

export {
  RechargeInput,
  RechargeReservationInput,
  RechargeReservationOutput,
  Status,
  RechargeOutput,
  RechargeByReservationIdInput,
  RechargeByIdInput,
  RechargeByIdOutput,
  RechargelistByStationInput,
};
