import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddIdArenaEmTableBattle1753492766995
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "battle",
      new TableForeignKey({
        name: "BattleArena",
        columnNames: ["id_arena"],
        referencedTableName: "arenas",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("battle", "BattleArena");
    await queryRunner.dropColumn("battle", "id_arena");
  }
}
