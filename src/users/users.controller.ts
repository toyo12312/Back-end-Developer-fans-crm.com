import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1')
// Make sure "export" is present here!
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add-user')
  async addUser(@Body() body: any) {
    // Requirements: save to DB and log to console
    return this.usersService.create(body);
  }

  @Get('get-users')
  async getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
  ) {
    return this.usersService.findAll(Number(page), Number(limit), search);
  }

  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
