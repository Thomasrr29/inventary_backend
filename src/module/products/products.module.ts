import { Module } from "@nestjs/common";
import { WarrantiesModule } from "./warranties/warranties.module";
import { ItemsModule } from "./items/items.module";

@Module({
    imports: [WarrantiesModule, ItemsModule],
    exports: [WarrantiesModule, ItemsModule]
})

export class ProductModule {}