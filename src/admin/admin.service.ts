import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prismaService:PrismaService){}

    async getUsers(page:number, limit:number){
        if (page < 1 || limit < 1) {
            throw new BadRequestException('Page and limit unda iyos naturaluri ricxvebi.')
          }
       
        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        const skip = (pageNumber-1) * limitNumber

        const users = await this.prismaService.user.findMany({
            skip,
            take: limitNumber,
            include: {
                PuzzleAttempts: true
            }
        })
  
        return users.map((user)=>({
            username: user.userName,
            // აპლიკაციის შიდა ცვლადები/სახელები ააწყე ყოველთვის ინგლისურად, თუ სხვანაირად არ გექნება მოთხოვნებში.
            // ამ შემთხვევაში, მხოლოდ API-ის ინტერფეისის მხარეს არის ქართულად, რაც მარტივად შესაცვლელია და დიდი პრობლემა
            // იქნებოდა
            sheqmnisdro: user.createdAt,
            warmatebuliPuzzles: user.PuzzleAttempts.filter((a)=> a.isSuccess).length,   
            warumatebeliPuzzles: user.PuzzleAttempts.filter((a)=>!a.isSuccess).length
        }))
    }
}
