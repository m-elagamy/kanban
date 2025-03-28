import { Loader } from "lucide-react";
import type { FormMode } from "@/lib/types";
import { DialogClose } from "./dialog";
import AnimatedButton from "./animated-button";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

type SubmitButtonProps = {
  isFormInvalid?: boolean;
  isPending?: boolean;
  formMode?: FormMode;
  className?: string;
  loadingText?: string;
};

export default function SubmitButton({
  isFormInvalid,
  isPending,
  formMode = "create",
  className,
  loadingText,
}: Readonly<SubmitButtonProps>) {
  const isDisabled = isFormInvalid || isPending;
  const isEditMode = formMode === "edit";

  const actionText = !isEditMode ? "Create" : "Save";
  const buttonText = isPending ? loadingText || actionText : actionText;

  return (
    <div className={cn("flex items-center justify-end gap-2 pt-2", className)}>
      <DialogClose asChild>
        <AnimatedButton
          type="button"
          size="sm"
          variant="outline"
          className="dark:hover:bg-accent/15"
          title="Close"
          disabled={isPending}
        >
          Close
        </AnimatedButton>
      </DialogClose>

      <AnimatedButton
        size="sm"
        type="submit"
        title={isPending ? `${actionText}ing...` : actionText}
        disabled={isDisabled}
        aria-busy={isPending}
      >
        {isPending && <Loader className="animate-spin" aria-hidden="true" />}
        {buttonText}
      </AnimatedButton>
    </div>
  );
}
