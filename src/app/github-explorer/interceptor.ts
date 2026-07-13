import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export const logger = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.log('Request made to: ', req.url);
  return next(req);
}