import { Field, Int, ObjectType } from "@nestjs/graphql";
import { type } from "os";

@ObjectType()
export class Pokemon {

    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field({nullable: true})
    image?: string;
}