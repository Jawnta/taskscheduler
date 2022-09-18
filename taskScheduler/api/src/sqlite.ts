import { Database } from "sqlite3";

const getDatabase = () => new Database("./sql.db");

export const getTasks = () => {
  const db = getDatabase();
  const sql = "SELECT * FROM tasks";
  return new Promise((resolve) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      db.close();
      resolve(rows);
    });
  });
};

export const addTask = (data: any) => {
  const db = getDatabase();

  const sql = `INSERT INTO tasks
  (
  description,
  deadline,
  estimated_duration,
  category
  )
  VALUES
  (
  "${data.description.value}",
  "${data.deadline.value}",
  "${data.estimation.value}",
  "${data.selected.value}"
    )`;
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Entry added to the table.");
  });
  db.close();

};

export const deleteTask = (id: number) => {
  const db = getDatabase();

  const sql = `DELETE FROM tasks WHERE id = "${id}"`;

  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log(`Task with id: ${id} removed from the table.`);
  });
  db.close();
};
