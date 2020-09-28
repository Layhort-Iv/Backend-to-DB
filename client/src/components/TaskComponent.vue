<template>
  <div class="container">
    <h1>Latest Tasks</h1>
    <hr />
    <div class="create-task">
      <label for="create-post">Say something...</label>
      <input
        type="text"
        id="create-post"
        v-model="task"
        placeholder="Create a task"
      />
      <button @click="createTask">Post!</button>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="task-container">
      <div
        class="post"
        v-for="(task, index) in tasks"
        :key="task._id"
        :index="index"
        :item="task"
        @dblclick="deleteTask(task._id)"
      >
        {{
          `${task.dateCreated.getDate()}/${task.dateCreated.getMonth()}/${task.dateCreated.getFullYear()}`
        }}
        <p class="text">{{ task.task }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from "../TaskService";

export default {
  name: "TaskComponent",
  data() {
    return {
      tasks: [],
      error: "",
      task: "",
    };
  },

  async created() {
    try {
      this.tasks = await TaskService.getTasks();
    } catch (err) {
      console.log(err);
      this.error = err.message;
    }
  },

  methods: {
    async createTask() {
      await TaskService.insertTask(this.task);
      this.tasks = await TaskService.getTasks();
    },
    async deleteTask(id) {
      await TaskService.deleteTask(id);
      this.tasks = await TaskService.getTasks();
    },
  },
};
</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: 3bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
