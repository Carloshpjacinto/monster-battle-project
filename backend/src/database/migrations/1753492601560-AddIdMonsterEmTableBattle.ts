import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddIdMonsterEmTableBattle1753492601560
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "battle",
      new TableForeignKey({
        name: "BattleMonsterPlayer1",
        columnNames: ["id_monster_player1"],
        referencedTableName: "monsters",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "battle",
      new TableForeignKey({
        name: "BattleMonsterPlayer2",
        columnNames: ["id_monster_player2"],
        referencedTableName: "monsters",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("battle", "BattleMonsterPlayer1");
    await queryRunner.dropColumn("battle", "id_monster_player1");

    await queryRunner.dropForeignKey("battle", "BattleMonsterPlayer2");
    await queryRunner.dropColumn("battle", "id_monster_player2");
  }
}
