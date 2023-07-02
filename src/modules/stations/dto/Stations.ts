import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
class SuitableStationsOutput {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  mass: number;

  @Field()
  hasStation?: boolean;
}

@ObjectType()
class StationsOutput {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  planetId: string;

  @Field((type) => SuitableStationsOutput)
  suitablePlanets: Object;
}

@InputType()
class StationInput {
  @Field((type) => ID)
  id: string;
}

export { SuitableStationsOutput, StationInput, StationsOutput };
