import { JwtAuthGuard } from "@app/auth-rpc";
import { PRESIGNED_CREATE, PRESIGNED_CREATE_POST } from "@app/common";
import { MediaServiceInterface, MEDIA_SERVICE } from "@app/media";
import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { GetPreSignedUrlDto } from "./dtos";

@Controller("/")
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(
    @Inject(MEDIA_SERVICE) private readonly mediaService: MediaServiceInterface
  ) {}

  @Get("/presigned")
  public createPresigned(@Body() getPreSignedUrlDto: GetPreSignedUrlDto) {
    return this.mediaService.createPresigned(getPreSignedUrlDto);
  }

  @MessagePattern(PRESIGNED_CREATE)
  public createPresignedMessage(
    @Payload() getPreSignedUrlDto: GetPreSignedUrlDto
  ) {
    return this.mediaService.createPresigned(getPreSignedUrlDto);
  }

  @Post("/presigned-post")
  public createPresignedPost(@Body() getPreSignedUrlDto: GetPreSignedUrlDto) {
    return this.mediaService.createPresignedPost(getPreSignedUrlDto);
  }

  @MessagePattern(PRESIGNED_CREATE_POST)
  public createPresignedPostMessage(
    @Payload() getPreSignedUrlDto: GetPreSignedUrlDto
  ) {
    return this.mediaService.createPresignedPost(getPreSignedUrlDto);
  }
}
