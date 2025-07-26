import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableBattle1753463557278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "battle",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },

          {
            name: "id_arena",
            type: "integer",
          },

          {
            name: "id_player1",
            type: "integer",
          },
          {
            name: "id_player2",
            type: "integer",
          },
          {
            name: "id_monster_player1",
            type: "integer",
          },
          {
            name: "id_monster_player2",
            type: "integer",
          },
          {
            name: "turn_counter",
            type: "integer",
            default: 0
          },
          {
            name: "player_wins",
            type: "varchar",
            default: null
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("battle");
  }
}
