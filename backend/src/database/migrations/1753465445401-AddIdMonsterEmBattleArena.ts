import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddIdMonsterEmBattleArena1753464666968
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "battle_arena",
      new TableColumn({
        name: "id_monster",
        type: "integer",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "battle_arena",
      new TableForeignKey({
        name: "BattleArenaMonster",
        columnNames: ["id_monster"],
        referencedTableName: "monsters",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("battle_arena", "BattleArenaMonster");
    await queryRunner.dropColumn("battle_arena", "id_monster");
  }
}
