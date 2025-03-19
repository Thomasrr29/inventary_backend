import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Items, ItemsSchema } from "./entities/items.schema";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Items.name, schema: ItemsSchema}])],
    controllers: [ItemsController],
    providers: [ItemsService]
})

export class ItemsModule {}