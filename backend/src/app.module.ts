import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaperParserModule } from './modules/paper-parser/paper-parser.module';
import { PrismaModule } from './modules/database/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PaperParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
