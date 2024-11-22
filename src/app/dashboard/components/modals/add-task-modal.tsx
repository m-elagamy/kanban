import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TaskPriority from "../task-priority";
import useBoardStore from "@/store/useBoardStore";
import { formatTags } from "../../utils/format-tags";
import AddTaskSchema from "@/schemas/task-schema";

type AddTaskFormValues = z.infer<typeof AddTaskSchema>;

type AddTaskModalProps = {
  columnId: string;
};

const AddTaskModal = ({ columnId }: AddTaskModalProps) => {
  const { addTask } = useBoardStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      tags: "",
    },
  });

  const handleAddTask = (data: AddTaskFormValues) => {
    addTask({
      id: `item-${Date.now()}`,
      columnId,
      title: data.title,
      description: data.description,
      priority: data.priority,
      tags: formatTags(data.tags),
    });
    setIsModalOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddTask)}
            className="space-y-4"
          >
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What&apos;s the task?{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Create a stunning new landing page"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What needs to be done?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Design a modern, mobile-friendly layout for the homepage"
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Priority Field */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How urgent is this?</FormLabel>
                  <FormControl>
                    <TaskPriority setPriority={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Tags Field */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What&apos;s the category?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., design, development, marketing"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-end">
              <Button className="p-2 md:p-3">Add Task</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
