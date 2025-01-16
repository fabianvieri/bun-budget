import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	loading: boolean;
};

export default function SubmitButton({
	loading,
	children,
	...props
}: SubmitButtonProps) {
	return (
		<Button {...props} disabled={props.disabled || loading} type="submit">
			<span className="flex gap-1 items-center justify-center">
				{children}
				{loading && <Loader2 size={16} className="animate-spin" />}
			</span>
		</Button>
	);
}
