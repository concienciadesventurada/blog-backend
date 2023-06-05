import { Migration } from '@mikro-orm/migrations';

export class Migration20230601180447 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "abstract" varchar(255) null, add column "cover_img" text null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop column "abstract";');
    this.addSql('alter table "post" drop column "cover_img";');
  }

}
