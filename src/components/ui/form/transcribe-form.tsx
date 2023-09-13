"use client"

import { FormEvent } from "react"
import {
  fileNameAtom,
  handlingAtom,
  transcriptionHandlerAtom,
} from "@/atoms/transcription-atoms"
import { useAtomValue, useSetAtom } from "jotai"

const TranscribeForm = () => {
  const handling = useAtomValue(handlingAtom)
  const submitHandler = useSetAtom(transcriptionHandlerAtom)
  const setFileName = useSetAtom(fileNameAtom)
  const getIdFromUrl = () => {
    const urlParts = window.location.pathname.split('/');
    return urlParts[urlParts.length - 1];
  };

  return (
    <form
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
          alert('No file selected');
          return;
        }

        const file = fileInput.files[0];

        const allowedFileTypes = ['flac', 'm4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'oga', 'ogg', 'wav', 'webm'];
        const fileExtension = file.name.split('.').pop();
    
        if (!allowedFileTypes.includes(fileExtension)) {
          alert('Invalid file type. Please select a valid file type.');
          return;
        }

        if (file.size > 25 * 1024 * 1024) {
          alert('File size exceeds the limit (25MB)');
          return;
        }

        const formData = new FormData(e.currentTarget)
        const idFromUrl = getIdFromUrl();
        formData.append('id', idFromUrl);
        try {
          await submitHandler(formData)
        } catch (error: any) {
          console.log(error)
        }
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFileName(e?.target?.files?.[0]?.name as string)
          }}
          type="file"
          max={25 * 1024 * 1024}
          accept="video/*"
          name="file"
        />
      </div>
      <br></br>
      <div className="flex gap-4">
        <button type="submit">
          {!handling ? (
            "Transcribe"
          ) : (
            <span className="animate-pulse">Transcribing...</span>
          )}{" "}
        </button>
      </div>
    </form>
  )
}

export default TranscribeForm
