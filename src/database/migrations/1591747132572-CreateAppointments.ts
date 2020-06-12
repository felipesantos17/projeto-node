import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1591747132572
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            // descrição e detalhes que uma coluna do bando de dados vai ter
            name: 'id', // nome da coluna
            type: 'uuid', // tipo do dado
            isPrimary: true, // se ele é Primary Key PK (Unico)
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            // já vem padrao na migration
            isNullable: false, // não permite que o campo seja nulo
          },
          {
            name: 'date',
            // pega a hora e data atual e aplica também o fuso horário
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
