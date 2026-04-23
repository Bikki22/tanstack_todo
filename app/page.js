import TodoFilter from "@/components/todo-filter";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import { connectDB } from "@/lib/db";

export default async function Home() {
  const conn = await connectDB();
  console.log(conn);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Todo App</h1>
          <p className="text-muted-foreground">
            Build with Nextjs, zustand, Tanstack Query, zod & mongoose
          </p>
        </header>
        <main>
          <TodoForm />
          <TodoFilter />
          <TodoList />
        </main>
      </div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>This app demonstrates CRUD operations with modern React patterns</p>
      </footer>
    </div>
  );
}
