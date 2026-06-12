import Image from "next/image"
export default function IntroHeader() {
    return (
        <div className='flex flex-col w-full items-center gap-1 py-10 px-8 border-b border-border'>
            <Image
                src="/images/logo.png"
                alt="로고 이미지"
                width={100}
                height={100}
            />
            <h1 className='font-display font-bold text-4xl text-text'>Mirrow</h1>
            <p className='text-sm text-subtext'>타인의 시선으로 발견하는 나</p>
        </div>
    )
}
