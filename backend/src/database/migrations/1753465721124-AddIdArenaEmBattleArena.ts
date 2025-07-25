import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddIdArenaEmBattleArena1753464666968
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "battle_arena",
      new TableColumn({
        name: "id_arena",
        type: "integer",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "battle_arena",
      new TableForeignKey({
        name: "BattleArenaArena",
        columnNames: ["id_arena"],
        referencedTableName: "arenas",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("battle_arena", "BattleArenaArena");
    await queryRunner.dropColumn("battle_arena", "id_arena");
  }
}
