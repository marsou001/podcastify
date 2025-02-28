import PodcastDetails from "@/components/PodcastDetails";
import { Id } from "@/convex/_generated/dataModel";

async function Page({ params }: { params: { podcastId: Id<"podcasts"> }}) {
  const { podcastId } = await params;

  return <PodcastDetails podcastId={podcastId} />
}

export default Page;