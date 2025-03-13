import Link from "next/link";
import { InfoIcon, PanelsTopLeft, ArrowLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { BoardSummary } from "@/lib/types";
import BoardActions from "./board-actions";
import { TaskPriorityFilter } from "../task/tasks-filter";
import { Button } from "@/components/ui/button";

type BoardHeaderProps = {
  board: BoardSummary;
};

const BoardHeader = ({ board }: BoardHeaderProps) => {
  return (
    <section className="mb-4 pb-6 pt-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <PanelsTopLeft size={24} />
            <h1 className="text-base font-semibold capitalize md:text-lg">
              {board.title?.replace(/-/g, " ")}
            </h1>
            {board.description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="size-4 text-muted-foreground hover:cursor-help hover:text-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-96">
                    {board.description}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <TaskPriorityFilter />
          <BoardActions board={board} />
        </div>
      </div>
    </section>
  );
};

export default BoardHeader;
