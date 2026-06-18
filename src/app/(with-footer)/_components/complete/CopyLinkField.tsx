'use client'

import Button from "@/components/ui/Button";
import { Copy } from "lucide-react";

type CopyLinkFieldProps = {
    url: string;
    buttonVariant: 'primary' | 'secondary';
    desktopButtonLabel: string;
    mobileButtonLabel: string;
    copied: boolean;
    onCopy: () => void;
}

export default function CopyLinkField({
    url,
    buttonVariant,
    desktopButtonLabel,
    mobileButtonLabel,
    copied,
    onCopy,
}: CopyLinkFieldProps) {
    const desktopLabel = copied ? '복사 완료' : desktopButtonLabel;
    const mobileLabel = copied ? '복사 완료' : mobileButtonLabel;

    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-4">
            <div className="flex min-h-[44px] min-w-0 flex-1 items-center rounded-input border border-border bg-white px-4 py-[13px]">
                <p className="truncate font-mono text-body-md md:text-body-lg text-muted" title={url}>
                    {url}
                </p>
            </div>
            <Button
                variant={buttonVariant}
                className="w-full gap-2 text-nowrap md:w-auto"
                onClick={onCopy}
            >
                <Copy size={16} className="shrink-0 md:hidden" />
                <span className="md:hidden">{mobileLabel}</span>
                <span className="hidden md:inline">{desktopLabel}</span>
            </Button>
        </div>
    );
}
