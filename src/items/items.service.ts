import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return this.itemModel.findById(id);
  }

  async create(item: CreateItemDto): Promise<Item> {
    const newItem = new this.itemModel(item);

    return newItem.save();
  }

  async update(item: CreateItemDto, id: string): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: String) {
    await this.itemModel.findByIdAndDelete(id);
  }
}
