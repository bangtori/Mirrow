'use client'

import Card from "@/components/ui/Card";
import CopyLinkField from "./CopyLinkField";

type CopyLinkCardProps = {
    title: string;
    description: string;
    url: string;
    buttonVariant: 'primary' | 'secondary';
    desktopButtonLabel: string;
    mobileButtonLabel: string;
    copied: boolean;
    onCopy: () => void;
}

export default function CopyLinkCard({
    title,
    description,
    url,
    buttonVariant,
    desktopButtonLabel,
    mobileButtonLabel,
    copied,
    onCopy,
}: CopyLinkCardProps) {
    return (
        <Card className="w-full gap-5 p-5 md:p-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <p className="text-heading-md md:text-heading-lg font-black text-text">
                        {title}
                    </p>
                </div>
                <p className="text-body-md md:text-body-lg text-subtext">
                    {description}
                </p>
            </div>
            <CopyLinkField
                url={url}
                buttonVariant={buttonVariant}
                desktopButtonLabel={desktopButtonLabel}
                mobileButtonLabel={mobileButtonLabel}
                copied={copied}
                onCopy={onCopy}
            />
        </Card>
    );
}
