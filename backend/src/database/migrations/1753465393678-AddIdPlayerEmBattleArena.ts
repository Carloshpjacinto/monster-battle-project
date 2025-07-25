import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddIdPlayerEmBattleArena1753464666968
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "battle_arena",
      new TableColumn({
        name: "id_player",
        type: "integer",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "battle_arena",
      new TableForeignKey({
        name: "BattleArenaPlayer",
        columnNames: ["id_player"],
        referencedTableName: "player",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("battle_arena", "BattleArenaPlayer");
    await queryRunner.dropColumn("battle_arena", "id_player");
  }
}
