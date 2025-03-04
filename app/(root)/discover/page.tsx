import DiscoverPodcasts from "@/components/DiscoverPodcasts";

async function Page({ searchParams }: { searchParams: { search: string }}) {
  const { search } = await searchParams;
  return <DiscoverPodcasts search={search} />
}

export default Page;