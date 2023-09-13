import Transcribe from "@/components/transcription"

export default function UploadPage({params} : {
    params: { id: string}
}) {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Transcribe videos.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Just upload video
        </p>
      </div>
      <Transcribe />
    </section>
  )
}
