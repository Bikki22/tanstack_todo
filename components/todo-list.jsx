"use client";

import React from "react";
import { useTodos } from "@/hooks/use-create-todo";
import { useTodoStore } from "@/store/todo-store";

import { Card, CardContent } from "./ui/card";
import { Loader2 } from "lucide-react";
import TodoItem from "./todo-item";

const TodoList = () => {
  const { data: todos, isLoading, error } = useTodos();

  const filteredTodos = useTodoStore((state) => state.filteredTodos());

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading todos...</p>
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-destructive">
            Error Loading todos: {error.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <Card>
        <CardContent className={"p-8 text-center"}>
          <p
            className="text-muted-foreground
            "
          >
            {todos?.length === 0
              ? "No todos yet. Create your first one."
              : "No todos match the current filter"}
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
