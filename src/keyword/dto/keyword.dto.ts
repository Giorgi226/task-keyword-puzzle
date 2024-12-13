import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class KeyWordDto {
   
    @ApiProperty({ example: '', description: 'keyword unda shedgebodes 2-20 latinuri simbolosgan, shesadzloa erios tire an/da space' })
    @IsNotEmpty()
    @IsString()
    @Length(2,20)
    @Matches(/^[a-zA-Z\s-]+$/)
    keyword:string
}