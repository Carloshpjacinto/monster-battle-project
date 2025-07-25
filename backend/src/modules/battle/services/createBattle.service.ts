import "reflect-metadata";
import { Battle } from "../entities/battle.entity";
import { BattleArenaRepository } from "../repositories/battle.repository";
import { CreateBattleDto } from "../dto/create-battle.dto";
import FindByIdPlayerService from "../../player/services/findByIdPlayer.service";
import FindByIdMonsterService from "../../monster/services/findByIdMonster.service";
import FindByIdArenaService from "../../arena/services/findByIdArena.service";
import CreatePlayerService from "../../player/services/createPlayer.service";
import { Player } from "../../player/entities/player.entity";
import { battleDetail } from "../types/battleDetail";

export default class CreateBattleArenaService {
  async execute(
    data: CreateBattleDto
  ): Promise<Battle | battleDetail> {
    const findByIdPlayerService = new FindByIdPlayerService();

    const findByIdMonsterService = new FindByIdMonsterService();

    const findByIdArenaService = new FindByIdArenaService();

    const createPlayerService = new CreatePlayerService();

    const player = await findByIdPlayerService.execute(data.id_player);
    if (!player) throw new Error("Player não encontrada");

    const arena = await findByIdArenaService.execute(data.id_arena);
    if (!arena) throw new Error("Arena não encontrada");

    const monster = await findByIdMonsterService.execute(data.id_monster);
    if (!monster) throw new Error("Monster não encontrada");

    const battleArenaPlayer = {
      turn_of_attack: false,
      turn_counter: 0,
      id_arena: arena,
      id_monster: monster,
      id_player: player,
    };

    const newBattleArenaPlayer =
      BattleArenaRepository.create(battleArenaPlayer);

    await BattleArenaRepository.save(newBattleArenaPlayer);

    const dataBot = { name: "Bot" };

    const bot = await createPlayerService.execute(dataBot);

    const botPlayer = bot as Player;

    let monsterBot = null;

    while (!monsterBot) {
      const randomId = Math.floor(Math.random() * 20) + 1;

      const monster = await findByIdMonsterService.execute(randomId);

      if (monster) {
        monsterBot = monster;
      }
    }

    const battleArenaBot = {
      turn_of_attack: false,
      turn_counter: 0,
      id_arena: arena,
      id_monster: monsterBot,
      id_player: botPlayer,
    };

    const newBattleArenaBot = BattleArenaRepository.create(battleArenaBot);

    await BattleArenaRepository.save(newBattleArenaBot);

    const battleDetail: battleDetail = {
      arena: {
        name: arena.name,
        max_player: arena.max_players,
      },
      Player: {
        name: player.name,
        monster: monster.name,
        hp: monster.hp,
        ataque: monster.attack,
        defesa: monster.defend,
        velocidade: monster.speed,
      },

      Bot: {
        name: "Bot",
        monster: monsterBot.name,
        hp: monsterBot.hp,
        ataque: monsterBot.attack,
        defesa: monsterBot.defend,
        velocidade: monsterBot.speed,
      },
    };

    return battleDetail;
  }
}
