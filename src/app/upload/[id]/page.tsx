import Transcribe from "@/components/transcription"

export default function UploadPage({params} : {
    params: { id: string}
}) {
  return (
  <div id="uploadArea" className="upload-area">
    <div className="upload-area__header">
      <h1 className="upload-area__title">動画の管理</h1>
      <p className="upload-area__paragraph">
        Accepted video file types (.mp3, .mp4) and max file size - 25MB
      </p>
    </div>
    <Transcribe />
  </div>

  )
}
