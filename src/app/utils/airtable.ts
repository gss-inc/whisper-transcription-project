const Airtable = require("airtable");

Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
  });
  
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
  
const table = base(process.env.AIRTABLE_TABLE_NAME);

const minifyData = (records: any[]) =>
  records.map((record) => minifyRecord(record));

const minifyRecord = (record: { id: string; fields: { jp_text: string; jp_fix_text: string; ch_text: string; }; }) => {
    return {
      id: record.id,
      jp_text: record.fields.jp_text,
      jp_fix_text: record.fields.jp_fix_text,
      ch_text: record.fields.ch_text,
    };
};
  
export { table, minifyData };