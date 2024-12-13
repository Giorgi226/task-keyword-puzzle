import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PuzzleService } from './puzzle.service';
import { AnswerPuzzleDto} from './dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { AuthenticatedRequest } from 'src/types';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('Puzzles')
@Controller('puzzle')
export class PuzzleController {
    constructor(private puzzleService:PuzzleService){}


    @ApiOperation({ summary: 'wamoighe puzzle' })
    @ApiResponse({ status: 200, description: 'puzzle movida warmatebit' })
    @ApiResponse({ status: 404, description: 'aghar aris gamouyenebeli keyword' })
    @Get('get')
    getPuzzle(){
        return this.puzzleService.getPuzzle()
    }


    @ApiOperation({ summary: 'puzzlis pasuxis dafiqsireba' })
    @ApiParam({ name: 'puzzleId', description: 'Id puzzle istvis' })
    @ApiResponse({ status: 200, description: 'pasuxi sworia!' })
    @ApiResponse({ status: 404, description: 'pazlebi ar moidzebna' })
    @Post('answer/:puzzleId')
    answerPuzzle(@Param('puzzleId')puzzleId:string,@Body() answerPuzzleDto: AnswerPuzzleDto,@Req() req: AuthenticatedRequest){
        const userId = req.user.id
        return this.puzzleService.answerPuzzle(puzzleId,userId,answerPuzzleDto)
    }
}
