import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../models/User";
import { IsEmail } from "class-validator";

@InputType()
class UserLoginInputData {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class UserLoginOutputData {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  token: string;
}

@InputType()
class UserRegisterInputData {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

export { UserRegisterInputData, UserLoginInputData, UserLoginOutputData };
