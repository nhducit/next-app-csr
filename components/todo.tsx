"use client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { getTodos, postTodo } from "../my-api";
import { Button } from "@adobe/react-spectrum";

function getTodos() {
  console.log("getTodos", new Date());
  return Promise.resolve([
    {
      id: 1,
      title: "1",
    },
  ]);
}

function postTodo({ id, title }: { id: number; title: string }) {
  return Promise.resolve([
    {
      id: 2,
      title: "2",
    },
  ]);
}

export function Todos() {
  console.log("render Todos", new Date());
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div>
      <ul>
        {query.data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <Button
        onPress={() => {
          mutation.mutate({
            id: Date.now(),
            title: "Do Laundry",
          });
        }}
        variant="accent"
      >
        Save
      </Button>
    </div>
  );
}
