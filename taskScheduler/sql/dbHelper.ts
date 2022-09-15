import Database from "better-sqlite3";

export const addTaskToDb = () => {
  const db = new Database("./sql.db");
  const stmt = db.prepare("SELECT * FROM tasks");
  const result = stmt.all();

  console.log(result);

  db.close();
  // const sql = `INSERT INTO tasks (
  // description,
  // deadline,
  // estimated_duration,
  // category)
  // VALUES (${values.description}, ${values.deadline}, ${values.estimate}, ${values.selected})
  // `;
  //
  // db.serialize(() => {
  //   db.each(sql, (err: any) => {
  //     if (err) {
  //       console.error(err.message);
  //     }
  //   });
  // });
  //
  // db.close();
  // console.log("lol");
};
addTaskToDb();
// export interface AddTaskData {
//   description: string;
//   deadline: string;
//   estimate: string;
//   selected: string;
// }
