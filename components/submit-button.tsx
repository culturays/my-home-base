"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
   const { pending, action } = useFormStatus();
  const isPending =action === props.formAction;
 
  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      { pending && isPending ? pendingText : children}
    </Button>
  );
}
 

// export function SubmitButton({
//   children,
//   pendingText = "Submitting...",
//   ...props
// }: Props) {
//     const { pending, action } = useFormStatus();


//   return (
//     <Button type="submit" aria-disabled={pending} {...props}>
//       {pending ? pendingText : children}
//     </Button>
//   );
// }