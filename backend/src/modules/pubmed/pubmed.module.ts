import { Module } from '@nestjs/common';
import { PubmedService } from './pubmed.service';

@Module({
  providers: [PubmedService],
  exports: [PubmedService],
})
export class PubmedModule {}
