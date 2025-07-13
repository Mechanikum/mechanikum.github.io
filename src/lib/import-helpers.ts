export const getImport = <T>(obj: Record<string, T>, slug: string) => Object.entries(obj)
	.find(([p]) => p.includes(`/${slug}/`))?.[1]

export const getImports = <T>(obj: Record<string, T>, slug: string) => Object.entries(obj)
	.map(([p, value]) => {
		if (p.includes(`/${slug}/`)) return (value)
	})
	.filter(v => v != undefined)