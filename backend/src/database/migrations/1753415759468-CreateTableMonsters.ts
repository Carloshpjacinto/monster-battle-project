import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableMonsters1753415759468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "monsters",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "hp",
            type: "integer",
          },
          {
            name: "attack",
            type: "integer",
          },
          {
            name: "defend",
            type: "integer",
          },
          {
            name: "speed",
            type: "integer",
          },
          {
            name: "special",
            type: "boolean",
            default: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("monsters");
  }
}
