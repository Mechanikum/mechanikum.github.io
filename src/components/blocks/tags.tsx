import {Badge} from "@/components/ui/badge";
import { Columns3Cog, Database, Wrench } from "lucide-react";
import { memo } from "react";

const BadgeOverrides = "p-2 [&>svg]:size-4 [&>svg]:mr-0.5 transition-colors border-1 tracking-wide md:text-sm select-none"

const Layout = () =>
	<Badge
		variant={"outline"}
		className={`${BadgeOverrides} bg-amber-700/20 [a&]:hover:bg-amber-600/25  text-amber-400 [a&]:hover:text-amber-300 border-amber-600 [a&]:hover:border-amber-500`}
	>
		<Columns3Cog/>
		Layout
	</Badge>

const CMS = () =>
	<Badge
		variant={"outline"}
		className={`${BadgeOverrides} bg-lime-700/20 [a&]:hover:bg-lime-600/25  text-lime-400 [a&]:hover:text-lime-300 border-lime-600 [a&]:hover:border-lime-500`}
	>
		<Database/>
		CMS
	</Badge>

const Maintenance = () =>
	<Badge
		variant={"outline"}
		className={`${BadgeOverrides} bg-yellow-700/20 [a&]:hover:bg-yellow-600/25  text-yellow-400 [a&]:hover:text-yellow-300 border-yellow-600 [a&]:hover:border-yellow-500`}
	>
		<Wrench/>
		Maintenance
	</Badge>

const TagMap = {
	"layout": Layout,
	"cms": CMS,
	"maintenance": Maintenance
}

const Tags: React.FC<{tags: string[]}> = ({tags}) => tags.map((tag)=>{

	const Component = TagMap[tag as keyof typeof TagMap]

	return <Component key={tag}/>
})

export default memo(Tags)