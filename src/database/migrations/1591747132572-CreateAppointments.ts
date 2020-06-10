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
            type: 'varchar', // tipo do dado
            isPrimary: true, // se ele é Primary Key PK (Unico)
            generationStrategy: 'uuid',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false, // não permite que o campo seja nulo
          },
          {
            name: 'date',
            // pega a hora e data atual e aplica também o fuso horário
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
