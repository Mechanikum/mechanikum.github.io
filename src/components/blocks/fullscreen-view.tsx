import {useEffect, useState} from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {Loader2} from "lucide-react";
import type {GetImageResult} from "astro";

export const FullscreenView: React.FC<{ gallery: Record<string, GetImageResult> }> = ({gallery}) => {
	const [open, setOpen] = useState(false);
	const [currentId, setCurrentId] = useState<string | null>(null);
	const [loaded, setLoaded] = useState(false);

	// global click handler
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			const el = (e.target as HTMLElement).closest("[data-image-id]") as HTMLElement | null;
			if (el?.dataset.imageId) {
				setCurrentId(el.dataset.imageId);
				setOpen(true);
			}
		};
		document.addEventListener("click", handler);
		return () => document.removeEventListener("click", handler);
	}, []);

	// show loader every time image changes
	useEffect(() => setLoaded(false), [currentId]);

	if (!currentId) return null;
	const image = gallery[currentId];

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				className="p-0 gap-0 bg-muted/30 backdrop-blur-sm text-neutral-500 w-max h-max flex justify-center"
				style={{
					maxWidth: `min(95vw, ${image.attributes.width}px)`,
					maxHeight: `min(90vh, ${image.attributes.height}px)`,
					aspectRatio: `${image.attributes.width}/${image.attributes.height}`,
				}}
			>
				<div className="relative">
					{!loaded && (
						<div
							className="absolute inset-0 flex items-center justify-center text-foreground"
						>
							<Loader2 className="size-12 animate-spin"/>
						</div>
					)}

					<img
						src={image.src}
						alt=""
						width={image.attributes.width}
						height={image.attributes.height}
						className={`rounded-lg transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
						onLoad={() => setLoaded(true)}
					/>
				</div>

				<DialogHeader className="p-0 size-0">
					<DialogTitle>{" "}</DialogTitle>
					<DialogDescription>{" "}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};