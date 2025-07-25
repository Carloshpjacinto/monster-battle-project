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
      "battle",
      new TableColumn({
        name: "id_monster",
        type: "integer",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "battle",
      new TableForeignKey({
        name: "BattleMonster",
        columnNames: ["id_monster"],
        referencedTableName: "monsters",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("battle", "BattleMonster");
    await queryRunner.dropColumn("battle", "id_monster");
  }
}
