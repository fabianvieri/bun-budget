import { PropsWithChildren } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { Button } from './button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './dialog';

type ModalButtonProps = PropsWithChildren<{
	buttonText: string;
	buttonVariant?: Pick<VariantProps<typeof Button>, 'variant'>['variant'];
	title: string;
	description?: string;
}>;

export default function ModalButton({
	children,
	buttonText,
	buttonVariant,
	title,
	description,
}: ModalButtonProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={buttonVariant}>{buttonText}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle className="text-destructive font-bold">
						{title}
					</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
}
