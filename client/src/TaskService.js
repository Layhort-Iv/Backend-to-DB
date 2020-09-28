import axios from "axios";

const url = "api/tasklist/";

class TaskService {
  static getTasks() {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          const data = res.data;
          resolve(
            data.map((task) => ({
              ...task,
              dateCreated: new Date(task.dateCreated),
            }))
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static insertTask(task) {
    return axios.post(url, { task });
  }

  static deleteTask(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default TaskService;
