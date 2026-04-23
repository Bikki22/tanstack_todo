"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { createTodoSchema } from "@/validations/todo";
import Todo from "@/model/todo";

export async function createTodo(data) {
  try {
    const validatedData = createTodoSchema.parse(data);

    await connectDB();
    const todo = await Todo.create(validatedData);

    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.error("Error creating todo", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create todo",
    };
  }
}

export async function getTodos() {
  try {
    await connectDB();

    const todos = await Todo.find({}).sort({ createdAt: -1 });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todos)),
    };
  } catch (error) {
    console.error("Error fetching Todos", error);
    return {
      success: false,
      error: "Failed to fetch todos",
    };
  }
}

export async function toggleTodo(id) {
  try {
    await connectDB();

    const todo = await Todo.findById(id);

    if (!todo) {
      return {
        success: false,
        error: "Todo not found",
      };
    }

    todo.completed = !todo.completed;

    await todo.save();

    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.error("Error toggling todo", error);
    return {
      success: false,
      error: "Failed to toggle todo",
    };
  }
}
