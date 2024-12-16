import { BadRequestException, Injectable, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnswerPuzzleDto} from './dto';
import { GoogleImageService } from 'src/google-image/google-image.service';

@Injectable()
export class PuzzleService implements OnModuleInit, OnModuleDestroy  {
   
    constructor(private prismaService:PrismaService, private googleImageService: GoogleImageService){}
    
    
    
    private puzzleTimers: Map<string, Date> = new Map()
    private timerInterval: NodeJS.Timeout
    onModuleInit() {
        /**
         * ასეც მუშაობს. უფრო მეტი სიზუსტისთვის შეიძლებოდა რომ თითოეულ პაზლს ცალკე ტაიმერი ჰქონოდა 90 წამიანი (setTimeout)
         * რომელიც წაშლიდა პაზლს 90 წამში და ჩაუწერდა იუზერს წარუმატებელ მცდელობად. წარმატების შემთხვევაში კი ტაიმაუტი
         * და პაზლი გაუქმდებოდა
         * და დარეგისტრირდებოდა წარმატებული მცდელობა.
         */
        this.timerInterval = setInterval(() => this.checkPuzzleTimers(), 1000)
    }
    onModuleDestroy() {
        clearInterval(this.timerInterval)
    }

    async getPuzzle(){
        const keyword = await this.prismaService.key.findFirst({
            where: {
                Puzzle: {
                  none: {
                    isActive: false,
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
        })
        if (!keyword) {
            throw new NotFoundException('Ar aris keyword monacemta bazashi')
        }

        const imageUrls = await this.googleImageService.fetchImages(keyword.keyword)


        /**
         * თვითონ პაზლების მენეჯმენტი აპლიკაციის შიგნითვე უფრო მარტივი იქნებოდა, ბაზაში შენახვა არ იყო საჭირო.
         */
    const puzzle = await this.prismaService.puzzle.create({
        data: {
        imageUrl: imageUrls,
          keywordId: keyword.id,
          remainingTimeSeconds: 90, 
        },
      });
      this.puzzleTimers.set(puzzle.puzzleId, new Date())
 
      return {
        puzzleId: puzzle.puzzleId,
        imageUrls: puzzle.imageUrl,
        remainingTimeSeconds: puzzle.remainingTimeSeconds,
      };
    }

    async answerPuzzle(puzzleId:string,userId: number,answerPuzzleDto:AnswerPuzzleDto){
        const { keyword } = answerPuzzleDto
        const lowerCaseKeyword = keyword.toLowerCase()

        const puzzle = await this.prismaService.puzzle.findUnique({
            where: {
                puzzleId
            },
            include: {
                keyword:true
            }

        })
        if(!puzzle){
            throw new NotFoundException('puzzle ar aris')
        }
        

        const startTime = this.puzzleTimers.get(puzzleId)
        if (!startTime) {
            throw new NotFoundException('Puzzle timer ar aris napovni.')
        }

        
        const currentTime = new Date();
        const elapsedSeconds = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000);

        /**
         * 5 სხვადასხვა ადგილას არის რიცხვი 90 გამოყენებული, ამის მენეჯმენტი გართულდებოდა მომავალში. ვინაიდან
         * საცდელი დავალებაა, კი ბატონო, მაგრამ სწორი პრაქტიკაა რომ ყველანაირი ცვლადი რიცხვი შეინახო
         * როგორც კონფიგურაცია და იქიდან აიღო როცა დაგჭირდება. ანუ გქონოდა კონფიგი PUZZLE_LIFETIME_SECONDS=90
         */
        if (elapsedSeconds > 90) {
        await this.prismaService.puzzle.update({
        where: { puzzleId },
        data: { isActive: false },
        });
        throw new BadRequestException('dro amoiwura')
        }

        const isCorrect = puzzle.keyword.keyword === lowerCaseKeyword


        /**
         * მოთხოვნებში მკაფიოდ არ ეწერა, მართალია. - არასწორი მცდელობა კი არ უნდა ჩაითვალოს წარუმატებლობად, არამედ
         * დრო რომ ამოიწურება სწორი პასუხის გარეშე, ეგ უნდა ჩაითვალოს მხოლოდ.
         */
        await this.prismaService.puzzleAttempt.create({
            data:{
                isSuccess:isCorrect,
                userId:userId,
                puzzleId: puzzleId
            }
        })


        if(isCorrect){
            await this.prismaService.puzzle.update({
                where:{
                    puzzleId
                },
                data: {
                    isActive: false
                }
            })
            /**
             * მოთხოვნების მიხედვით, სწორად პასუხის შემთხვევაშიც პაზლის დეაქტივაცია უნდა მოხდეს. ახლა როგორც წერია,
             * ერთ პაზლზე ბევრი ქულის დაწერა შეიძლება ბევრჯერ თუ უპასუხებ.
             */
            return {
                statusCode: 200,
                message: 'pasuxi sworia',
                remainingTimeSeconds: 90 - elapsedSeconds,
            };
        }else {
            throw new BadRequestException('araswori pasuxi');
        }
    }



    
    private async deactivatePuzzle(puzzleId: string) {
        this.puzzleTimers.delete(puzzleId)
        await this.prismaService.puzzle.update({
            where: { puzzleId },
            data: { isActive: false },
        });
    }

    
    private async checkPuzzleTimers() {
        const currentTime = new Date()

        for (const [puzzleId, startTime] of this.puzzleTimers) {
            const elapsedSeconds = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000)

            if (elapsedSeconds > 90) {
                await this.deactivatePuzzle(puzzleId)
            }
        }
    }
}
