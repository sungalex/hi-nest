import { Controller, Get } from '@nestjs/common';

@Controller()
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }
}
