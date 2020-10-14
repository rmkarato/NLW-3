import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1602685471801 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table ({
      name: "images",
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
          name: "path",
          type: "varchar",
        },
        {
          name: "orphanage_id",
          type: "integer",

        },
      ],
      foreignKeys: [
        {
          name: "ImageOrphanage",
          columnNames: ["orphanage_id"],
          referencedTableName: "orphanages",
          referencedColumnNames: ["id"],
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        }

      ],
    }));
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("images");
  };
};