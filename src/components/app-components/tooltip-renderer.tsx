import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type TooltipRendererProps = {
    text: string;
    children: React.ReactElement;
};

export const TooltipRenderer = ({
    text,
    children
} : TooltipRendererProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-heading">{text}</p>
            </TooltipContent>
        </Tooltip>
    )
}