import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class AuthDto {
    @ApiProperty({ example: '' })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({ example: '' })
    @IsString()
    @IsNotEmpty()
    password: string 

    @IsString()
    @IsOptional()
    role?: string;
}


