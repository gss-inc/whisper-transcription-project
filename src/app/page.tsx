import Image from 'next/image'
import styles from './page.module.css'
import Upload from "../components/upload";
import FormContainer from "../components/form-container";

export default function Home() {
  return (
    <div className="relative bg-white w-full h-[834px] overflow-x-auto text-left text-sm text-black font-noto-sans-jp">
      <b className="absolute top-[160px] left-[231px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
        名前
      </b>
      <b className="absolute top-[160px] left-[611px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
        投稿日
      </b>
      <b className="absolute top-[160px] left-[801px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
        ファイルサイズ
      </b>
      <b className="absolute top-[28px] left-[231px] text-[32px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
        動画の管理
      </b>
      <div className="absolute top-[0px] left-[0px] w-[196px] h-[834px]">
        <div className="absolute top-[0px] left-[0px] bg-ghostwhite w-[196px] h-[834px]" />
        <b className="absolute top-[18px] left-[44px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          動画の管理
        </b>
        <img
          className="absolute top-[21px] left-[14px] w-4 h-4 overflow-hidden object-cover"
          alt=""
          src="/undefined.png"
        />
      </div>
      <div className="absolute top-[190.75px] left-[230.75px] box-border w-[924.5px] h-[0.5px] border-t-[0.5px] border-solid border-lightgray" />
      <Upload />
      <FormContainer />
      <div className="absolute top-[236px] left-[231px] w-[924px] h-[30px]">
        <div className="absolute top-[1px] left-[0px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          OOOOOO.mp4
        </div>
        <div className="absolute top-[1px] left-[380px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          2023/09/01
        </div>
        <div className="absolute top-[1px] left-[570px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          10.1MB
        </div>
        <div className="absolute top-[29.75px] left-[-0.25px] box-border w-[924.5px] h-[0.5px] border-t-[0.5px] border-solid border-lightgray" />
        <div className="absolute top-[0px] left-[828px] w-[92px] h-[25px]">
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
      <div className="absolute top-[276px] left-[231px] w-[924px] h-[30px]">
        <div className="absolute top-[1px] left-[0px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          OOOOOO.mp4
        </div>
        <div className="absolute top-[1px] left-[380px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          2023/09/01
        </div>
        <div className="absolute top-[1px] left-[570px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          10.1MB
        </div>
        <div className="absolute top-[29.75px] left-[-0.25px] box-border w-[924.5px] h-[0.5px] border-t-[0.5px] border-solid border-lightgray" />
        <div className="absolute top-[0px] left-[828px] w-[92px] h-[25px]">
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
      <div className="absolute top-[316px] left-[231px] w-[924px] h-[30px]">
        <div className="absolute top-[1px] left-[0px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          OOOOOO.mp4
        </div>
        <div className="absolute top-[1px] left-[380px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          2023/09/01
        </div>
        <div className="absolute top-[1px] left-[570px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          10.1MB
        </div>
        <div className="absolute top-[29.75px] left-[-0.25px] box-border w-[924.5px] h-[0.5px] border-t-[0.5px] border-solid border-lightgray" />
        <div className="absolute top-[0px] left-[828px] w-[92px] h-[25px]">
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
      <div className="absolute top-[356px] left-[231px] w-[924px] h-[30px]">
        <div className="absolute top-[1px] left-[0px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          OOOOOO.mp4
        </div>
        <div className="absolute top-[1px] left-[380px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          2023/09/01
        </div>
        <div className="absolute top-[1px] left-[570px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          10.1MB
        </div>
        <div className="absolute top-[29.75px] left-[-0.25px] box-border w-[924.5px] h-[0.5px] border-t-[0.5px] border-solid border-lightgray" />
        <div className="absolute top-[0px] left-[828px] w-[92px] h-[25px]">
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
      <div className="absolute top-[396px] left-[231px] w-[924px] h-[30px]">
        <div className="absolute top-[1px] left-[0px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          OOOOOO.mp4
        </div>
        <div className="absolute top-[1px] left-[380px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          2023/09/01
        </div>
        <div className="absolute top-[1px] left-[570px] tracking-[0.11em] leading-[161.5%] mix-blend-darken">
          10.1MB
        </div>
        <div className="absolute top-[29.75px] left-[-0.25px] box-border w-[924.5px] h-[0.5px] border-t-[0.5px] border-solid border-lightgray" />
        <div className="absolute top-[0px] left-[828px] w-[92px] h-[25px]">
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
    </div>
  );
}
