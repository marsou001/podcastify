async function PodcastDetails({ params }: { params : { podcastId: string }}) {
  const { podcastId } = await params;
  
  return (
    <p className="text-white-1">Podcast details for { podcastId }</p>
  )
}

export default PodcastDetails;