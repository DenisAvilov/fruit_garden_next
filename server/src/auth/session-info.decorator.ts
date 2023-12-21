import { ExecutionContext, createParamDecorator } from "@nestjs/common";
// Забераем поле session которое ми вказали в ГВАРДЕ в req['session']
export const SessionInfo = createParamDecorator((_, ctx: ExecutionContext) =>  ctx.switchToHttp().getRequest().session)