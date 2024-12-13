import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Key } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KeywordService {
    constructor(private prismaService:PrismaService){}

    async createKeyWord(keyword: string): Promise<{id:string}>{
        const lowerCaseKeyword = keyword.toLowerCase()

        try{
            const createKeyWord = await this.prismaService.key.create({
                data:{
                    keyword: lowerCaseKeyword
                }
            })
            return {id: createKeyWord.id}
        }catch(error){
            if(error.code === 'P2002'){
                throw new ConflictException('keyword ukve arsebobs')
            }
            throw error
        }
        

    }

    async getKeyWord(): Promise<Key[]>{
        try{
            return this.prismaService.key.findMany();
        }catch(error){
            throw error
        }
        
    }

    async updateKeyWord(id:string , keyword: string): Promise<void>{
        const lowerCaseKeyword = keyword.toLowerCase()

        try {
            await this.prismaService.key.update({
                where: {
                    id
                },
                data: {
                    keyword: lowerCaseKeyword
                }
            })
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('Keyword ar moidzebna')
            }
            if(error.code === 'P2002'){
                throw new ConflictException('keyword ukve arsebobs')
            }
            throw error
        }
    }

    async deleteKeyWord(id:string): Promise<void>{
        try {
             await this.prismaService.key.delete({
                where:{
                    id
                }
            })
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('Keyword ar moidzebna')
              }
            throw error;
        }
    }

}
