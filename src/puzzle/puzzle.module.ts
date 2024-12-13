import { Module } from '@nestjs/common';
import { PuzzleService } from './puzzle.service';
import { PuzzleController } from './puzzle.controller';

@Module({
  providers: [PuzzleService],
  controllers: [PuzzleController]
})
export class PuzzleModule {}
