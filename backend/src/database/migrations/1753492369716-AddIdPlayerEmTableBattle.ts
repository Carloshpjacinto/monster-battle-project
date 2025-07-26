import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
} from "typeorm";

export class AddIdPlayerEmTableBattle1753492369716
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "battle",
      new TableForeignKey({
        name: "BattlePlayer1",
        columnNames: ["id_player1"],
        referencedTableName: "player",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "battle",
      new TableForeignKey({
        name: "BattlePlayer2",
        columnNames: ["id_player2"],
        referencedTableName: "player",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("battle", "BattlePlayer1");
    await queryRunner.dropColumn("battle", "id_player1");

    await queryRunner.dropForeignKey("battle", "BattlePlayer2");
    await queryRunner.dropColumn("battle", "id_player2");
  }
}
