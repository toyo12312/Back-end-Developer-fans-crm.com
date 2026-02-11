import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onApplicationBootstrap() {
    const count = await this.userModel.countDocuments();
    if (count === 0) {
      await this.seedUsers();
    }
  }

  private async seedUsers() {
    this.logger.log('Seeding 2,000,000 users...');
    const total = 2000000;
    const batchSize = 20000;

    for (let i = 0; i < total; i += batchSize) {
      const users = Array.from({ length: batchSize }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number(),
        birthday: faker.date.birthdate(),
      }));
      await this.userModel.insertMany(users);
      if ((i + batchSize) % 100000 === 0) {
        this.logger.log(`Inserted ${i + batchSize} records`);
      }
    }
  }

  async findAll(page: number, limit: number, search?: string) {
    const query = search
      ? {
          $or: [
            { name: new RegExp(search, 'i') },
            { email: new RegExp(search, 'i') },
            { phone: new RegExp(search, 'i') },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.userModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments(query),
    ]);

    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async create(data: any) {
    this.logger.log(`New user data: ${JSON.stringify(data)}`);
    return new this.userModel(data).save();
  }
}
