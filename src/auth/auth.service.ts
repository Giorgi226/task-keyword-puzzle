import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from "argon2";
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AuthService {
    constructor(private prismaService:PrismaService,private jwt: JwtService,private config: ConfigService){}

    
        async signup(dto:AuthDto){
            const hash = await argon.hash(dto.password)
            const role = dto.role || 'user';
            try{
                const user  = await this.prismaService.user.create({
                    data: {
                        userName: dto.username,
                        hash,
                        role
                    }
                })
                
                return this.signToken(user.id, user.userName, user.role)
            }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('registrirebuli am monacemit ukve arsebobs')
                }
            }
            throw error
            }
            
        }


        async signin(dto:AuthDto){
            const user = await this.prismaService.user.findUnique({
                where: {
                    userName: dto.username
                }
            })

            if(!user) throw new ForbiddenException('araswori monacemebi')
            
            const pwMatches = await argon.verify(user.hash,dto.password)
        
            if(!pwMatches) throw new ForbiddenException('araswori paroli')       
        
        
            return this.signToken(user.id, user.userName, user.role)
        }   



        async signToken(userId:number, username:string, role: string ): Promise <{access_token:string}>{
            const payload = {
                sub: userId,
                username,
                role
            }
            const jwtSecret = this.config.get('JWT_SECRET')
            const token = await this.jwt.signAsync(payload,{
                expiresIn: '30m',
                secret: jwtSecret
            })
    
            return {
                access_token: token
            }
        }

        
} 
    
    






    

