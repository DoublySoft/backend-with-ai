import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import {
  createInfoResponse,
  createSuccessResponse,
  InfoResponse,
  SuccessResponse,
} from "@libs/common";
import { IndexService } from "../../application/services/index.service";

@Controller()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get()
  async getRoot(@Req() req: Request): Promise<InfoResponse> {
    return createInfoResponse({
      message: "Backend with AI API",
      messageKey: "api.info",
      path: req.url,
    });
  }

  @Get("health")
  async getHealth(
    @Req() req: Request,
  ): Promise<SuccessResponse<Awaited<ReturnType<IndexService["getHealth"]>>>> {
    const health = await this.indexService.getHealth();
    return createSuccessResponse({
      data: health,
      message: "Service is healthy",
      messageKey: "health.check.success",
      path: req.url,
    });
  }

  @Get("health/detailed")
  async getDetailedHealth(
    @Req() req: Request,
  ): Promise<
    SuccessResponse<Awaited<ReturnType<IndexService["getDetailedHealth"]>>>
  > {
    const health = await this.indexService.getDetailedHealth();
    return createSuccessResponse({
      data: health,
      message: "Detailed health check completed",
      messageKey: "health.check.detailed.success",
      path: req.url,
    });
  }
}
