import { Database } from "sqlite3";

const getDatabase = () => new Database("./sql.db");

export const getTasks = () => {
  const db = getDatabase();
  const sql = `
    SELECT 
    tasks.id,
    tasks.description,
    categories.category,
    tasks.starting_time,
    tasks.deadline,
    tasks.estimated_duration,
    tasks.actual_duration,
    tasks.elapsed_time,
    tasks.status
    FROM 
    tasks 
    LEFT JOIN 
    categories 
    on 
    tasks.category = categories.id`;
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

export const updateTask = (data: any) => {
  const db = getDatabase();
  const sql = `UPDATE tasks 
  SET 
  description = "${data.description}",
  category = "${data.category}",
  deadline = "${data.deadline}",
  estimated_duration = ${data.estimated_duration},
  actual_duration = ${data.actual_duration},
  elapsed_time = ${data.elapsed_time},
  status = "${data.status}"

  
  WHERE id = ${data.id}
  `;
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Entry updated");
  });
  db.close();
};

export const addTask = (data: any) => {
  const db = getDatabase();

  const sql = `INSERT INTO tasks
  (
  description,
  deadline,
  starting_time,
  estimated_duration,
  category,
    status
  )
  VALUES
  (
  "${data.description.value}",
  "${data.deadline.value}",
  "${data.startTime.value}",
  "${data.estimation.value}",
  "${data.selected.value}",
   "${data.status.value}"
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

export const getTask = (id: number) => {
  const db = getDatabase();

  const sql = `
    SELECT 
    tasks.id,
    tasks.description,
    categories.category,
    tasks.starting_time,
    tasks.deadline,
    tasks.estimated_duration,
    tasks.actual_duration,
    tasks.elapsed_time,
    tasks.status
    FROM 
    tasks 
    LEFT JOIN 
    categories 
    on 
    tasks.category = categories.id
    WHERE tasks.id = ${id}`;
  return new Promise((resolve) => {
    db.get(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      db.close();
      resolve(rows);
    });
  });
};

export const getCategories = () => {
  const db = getDatabase();
  const sql = "SELECT * FROM categories";
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

export const getCategory = (category: string) => {
  const db = getDatabase();
  const sql = `SELECT * FROM categories WHERE category = "${category}"`;
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

export const addCategory = (data: any) => {
  const db = getDatabase();

  const sql = `INSERT INTO categories
  (
  category
  )
  VALUES
  (
  "${data.value}"
  )
  returning *`;
  return new Promise((resolve) => {
    db.get(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      db.close();
      resolve(rows);
    });
  });
};

export const getUserCap = () => {
  const db = getDatabase();
  const sql = `SELECT * FROM user_cap WHERE id = 1`;
  return new Promise((resolve) => {
    db.get(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      db.close();
      resolve(rows);
    });
  });
};

export const updateUserCap = (hours: number) => {
  const db = getDatabase();
  const sql = `UPDATE user_cap 
  SET 
  cap = "${hours}"
  WHERE id = 1
  `;
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Entry updated");
  });
  db.close();
};