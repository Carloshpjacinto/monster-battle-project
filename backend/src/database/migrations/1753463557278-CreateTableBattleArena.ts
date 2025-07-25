import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableBattleArena1753463557278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "battle_arena",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },

          {
            name: "turn_of_attack",
            type: "boolean",
            default: false,
          },

          {
            name: "turn_counter",
            type: "integer",
            default: 0,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("battle_arena");
  }
}
