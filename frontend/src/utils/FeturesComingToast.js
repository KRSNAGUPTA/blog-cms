import { toast } from "@/hooks/use-toast";

export const FeturesComingToast = ({
  toastMsg = "Feature coming soon!",
  variant = "",
}) => {
  return toast({
    title: toastMsg,
    variant: variant,
  });
};