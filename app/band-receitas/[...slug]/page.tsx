export default async function DynamicPage({ params }: { params: { slug: string[] } }) {
    const teste = await params;

    console.log(params)
}