import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @ApiOperation({ summary: 'user is registracia' })
    @Post('signup')
    signup(@Body() dto: AuthDto){
        return this.authService.signup(dto)
    }
  
    @ApiOperation({ summary: 'user/admin avtorizacia' })
    @Post('signin')
    signin(@Body() dto : AuthDto){
        return this.authService.signin(dto)
    } 

}
