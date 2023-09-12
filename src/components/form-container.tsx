import type { NextPage } from "next";

const FormContainer: NextPage = () => {
  return (
    <div className="absolute top-[127px] left-[231px] w-[924px] h-[99px] text-left text-sm text-black font-noto-sans-jp">
      <div className="absolute top-[70px] left-[0px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
        OOOOOO.mp4
      </div>
      <div className="absolute top-[70px] left-[380px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
        2023/09/01
      </div>
      <div className="absolute top-[70px] left-[570px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
        10.1MB
      </div>
      <div className="absolute top-[0px] left-[740px] text-3xs tracking-[0.11em] leading-[161.5%] mix-blend-darken">
        最大アップロードサイズ：100MB
      </div>
      <div className="absolute top-[98.75px] left-[-0.25px] box-border w-[924.5px] h-[0.5px] border-t-[0.5px] border-solid border-lightgray" />
      <div className="absolute top-[69px] left-[828px] w-[92px] h-[25px]">
        <div className="absolute top-[0px] left-[0px] rounded-2xl bg-white box-border w-[92px] h-[25px] border-[1px] border-solid border-lightgray" />
        <div className="absolute top-[4px] left-[17px] w-3 h-4 overflow-hidden" />
        <img
          className="absolute h-[64%] w-[13.04%] top-[16%] right-[68.48%] bottom-[20%] left-[18.48%] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/undefined2.png"
        />
        <div className="absolute top-[0px] left-[41px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          削除
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
