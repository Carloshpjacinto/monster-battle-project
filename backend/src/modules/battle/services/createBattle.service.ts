import "reflect-metadata";
import { Battle } from "../entities/battle.entity";
import { BattleArenaRepository } from "../repositories/battle.repository";
import { CreateBattleDto } from "../dto/create-battle.dto";
import FindPlayerByIdService from "../../player/services/findPlayerById.service";
import FindByIdMonsterService from "../../monster/services/findByIdMonster.service";
import FindByIdArenaService from "../../arena/services/findByIdArena.service";
import CreatePlayerService from "../../player/services/createPlayer.service";
import { Player } from "../../player/entities/player.entity";
import { battleDetail } from "../types/battleDetail";

export default class CreateBattleService {
  async execute(
    id_player: number,
    data: CreateBattleDto
  ): Promise<Battle | battleDetail> {
    const findPlayerByIdService = new FindPlayerByIdService();

    const findByIdMonsterService = new FindByIdMonsterService();

    const findByIdArenaService = new FindByIdArenaService();

    const createPlayerService = new CreatePlayerService();

    const player = await findPlayerByIdService.execute(id_player);
    if (!player) throw new Error("Player não encontrada");

    const arena = await findByIdArenaService.execute(data.id_arena);
    if (!arena) throw new Error("Arena não encontrada");

    const monsterPlayer = await findByIdMonsterService.execute(
      data.id_monsterPlayer
    );
    if (!monsterPlayer) throw new Error("Monster não encontrada");

    const monsterBot = await findByIdMonsterService.execute(data.id_monsterBot);
    if (!monsterBot) throw new Error("Monster não encontrada");

    const dataBot = { name: "Bot" };

    const bot = await createPlayerService.execute(dataBot);

    const botPlayer = bot as Player;

    const battle = {
      arena: arena,
      player1: player,
      player2: botPlayer,
      monster_player1: monsterPlayer,
      monster_player2: monsterBot,
      turn_counter: 0,
      player_wins: "Bot",
    };

    const newBattle = BattleArenaRepository.create(battle);

    const createBattle = await BattleArenaRepository.save(newBattle);

    const battleDetail: battleDetail = {
      id: createBattle.id,
      arena: {
        name: arena.name,
        max_player: arena.max_players,
      },
      Player: {
        name: player.name,
        monster: monsterPlayer.name,
        hp: monsterPlayer.hp,
        ataque: monsterPlayer.attack,
        defesa: monsterPlayer.defend,
        velocidade: monsterPlayer.speed,
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
