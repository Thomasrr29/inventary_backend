import { HttpStatus } from "@nestjs/common";

export interface ResponseServiceDto {
    message: string,
    data: any,
    status: HttpStatus
}