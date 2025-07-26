import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddIdBattleEmTableResult1753493446396
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "result",
      new TableForeignKey({
        name: "ResultBattle",
        columnNames: ["id_battle"],
        referencedTableName: "battle",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("result", "ResultBattle");
    await queryRunner.dropColumn("result", "id_battle");
  }
}
