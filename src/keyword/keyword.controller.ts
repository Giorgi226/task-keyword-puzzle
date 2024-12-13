import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeyWordDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator';
import { JwtGuard, RolesGuard } from 'src/auth/guard';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Keywords')
@Controller('keyword')
export class KeywordController {
    constructor(private keywordService:KeywordService){}

    @Roles('admin')
    @ApiOperation({ summary: 'sheqmna axali keyword' })
    @Post('create')
    createKeyWord(@Body()KeyWordDto : KeyWordDto){
        return this.keywordService.createKeyWord(KeyWordDto.keyword)
    }

    @Roles('admin')
    @ApiOperation({ summary: 'gamoidzaxo yvela keyword' })
    @Get('get')
    getKeyWord(){
        return this.keywordService.getKeyWord()
    }

    @Roles('admin')
    @ApiOperation({ summary: 'ganaaxlo keyword' })
    @Put('update/:id')
    updateKeyWord(@Param('id')id: string , @Body()KeyWordDto: KeyWordDto){
        return this.keywordService.updateKeyWord(id,KeyWordDto.keyword)
    }
    
    @Roles('admin')
    @ApiOperation({ summary: 'washalo keyword' })
    @Delete('delete/:id')
    deleteKeyWord(@Param('id')id: string){
        return this.keywordService.deleteKeyWord(id)
    }

    
}
