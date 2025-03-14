import { IRepository } from "./IRepository";

export class GenericRepository<T> implements IRepository<T> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async save(entity: any): Promise<void> {
    await this.model.upsert({
      where: { id: entity.id },
      update: entity,
      create: entity,
    });
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}
