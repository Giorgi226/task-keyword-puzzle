import { Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Admin')
@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService){}

    @ApiOperation({ summary: 'userebis sia, mati sheqmnis droita da warmatebuli/warumatebeli puzzleebit' })
    @ApiQuery({ name: 'page', required: false, description: 'paginaciis page' })
    @ApiQuery({ name: 'limit', required: false, description: 'paginaciis limiti ert gverdze gantavsebistvis' })
    @Roles('admin')
    @Get('users')

    /**
     * მიღებული მიდგომაა რომ მინიმუმ კონტროლერის ფუნქციებს მაინც ჰქონდეს გაწერილი return type-ად გაწერილი შესაბამისი DTO
     * და სვაგერშიც გამოჩნდება რას აბრუნებს.
     * ასევე, თუ ერთზე მეტი query პარამეტრი აქვს, ეგეც ცალკე query dto-დ ჯობია იყოს გაწერილი და ვალიდაციებსაც dto-ში დაადებ
     */
    getUsers(@Query('page')page: number,@Query('limit')limit: number ){
        return this.adminService.getUsers(page,limit)
    }
}
