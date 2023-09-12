import type { NextPage } from "next";

const Upload: NextPage = () => {
  return (
    <div className="absolute top-[81px] left-[935px] w-[220px] h-[46px] text-center text-sm text-white font-noto-sans-jp">
      <div className="absolute h-[80.43%] w-[86.36%] top-[13.04%] right-[1.82%] bottom-[6.52%] left-[11.82%] rounded-md bg-black" />
      <b className="absolute top-[30.43%] left-[35%] leading-[20px]">
        動画のアップロード
      </b>
      <img
        className="absolute h-[43.48%] w-[10.91%] top-[30.43%] right-[69.55%] bottom-[26.09%] left-[19.55%] max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src="/undefined1.png"
      />
    </div>
  );
};

export default Upload;
