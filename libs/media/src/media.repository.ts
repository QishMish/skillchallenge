import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityRepository } from "@app/database";
import { Repository } from "typeorm";
import { MediaEntity } from "./entities";

@Injectable()
export class MediaRepository extends EntityRepository<MediaEntity> {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaEntity: Repository<MediaEntity>
  ) {
    super(mediaEntity);
  }
}
