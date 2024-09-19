import { Module } from '@nestjs/common';
import { ConductscienceSdkService } from './conductscienceSdk.service';

@Module({
  imports: [],
  providers: [ConductscienceSdkService],
  exports: [ConductscienceSdkService],
})
export class ConductscienceSdkModule {}
