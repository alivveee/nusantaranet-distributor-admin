import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';

export function PopoverButton({
  content,
  children,
}: {
  content: React.ReactNode;
  children: React.ReactNode | string;
}) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
}
