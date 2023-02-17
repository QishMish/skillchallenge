import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository } from '@app/database';
import { Repository } from 'typeorm';
import { SkillTestEntity } from './entities';

@Injectable()
export class SkillTestRepository extends EntityRepository<SkillTestEntity> {
  constructor(
    @InjectRepository(SkillTestEntity)
    private readonly skillTestEntity: Repository<SkillTestEntity>,
  ) {
    super(skillTestEntity);
  }
 
}
