import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class orphanagesCreate1602637465828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //realiza alterações
    //cria nova tabela, cria novo campo, delete algum campo
    await queryRunner.createTable(new Table({
      name: "orphanages",
      columns: [
        {
          name: "id",
          type: "integer",
          unsigned: true, //numero sempre vai ser positivo
          isPrimary: true, //chave única de cada usuário/orfanato
          isGenerated: true, //coluna gerada automaticamente
          generationStrategy: "increment", //gerada automaticamente utilizando uma logica incremental
        },
        {
          name: "name",
          type: "varchar",
        },
        {
          name: "latitude",
          type: "decimal",
          scale: 10,
          precision: 2,
        },
        {
          name: "longitude",
          type: "decimal",
          scale: 10,
          precision: 2,
        },
        {
          name: "about",
          type: "text",
        },
        {
          name: "instructions",
          type: "text",
        },
        {
          name: "opening_hours",
          type: "varchar",
        },
        {
          name: "open_on_weekends",
          type: "boolean",
          default: "false",
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //desfazer o que foi feito no up
    await queryRunner.dropTable("orphanages");
  }

}
