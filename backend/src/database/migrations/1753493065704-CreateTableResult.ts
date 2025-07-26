import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableResult1753493065704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "result",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "id_battle",
            type: "integer",
          },
          {
            name: "name_arena",
            type: "varchar",
          },
          {
            name: "name_player",
            type: "varchar",
          },
          {
            name: "name_monster",
            type: "varchar",
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
          },
          {
            name: "turn_of_attack",
            type: "boolean",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("result");
  }
}
