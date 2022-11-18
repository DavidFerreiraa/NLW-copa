import Image from "next/image"; //Used in next to load images at web
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import avatarImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";

export default function Home() {
    return (
        <div className="max-w-[1124px] mx-auto h-screen grid grid-cols-2 items-center gap-28">
            <main>
                <Image src={logoImg} alt="NLW COPA" />
                <h1 className="mt-14 text-white text-5xl leading-tight font-bold">
                    Crie seu próprio bolão da copa e compartilhe entre amigos!
                </h1>
                <div className="mt-10 flex items-center gap-2">
                    <Image
                        src={avatarImg}
                        alt="Users example avatar"
                        quality={100}
                    />
                    <strong className="text-gray-100 text-xl">
                        <span className="text-ignite-500">+12.592</span> pessoas
                        já estão usando
                    </strong>
                </div>
                <form className="mt-10 flex gap-2">
                    <input
                        className="flex-1 py-4 px-6 rounded bg-gray-800 border border-gray-600 placeholder:text-sm"
                        type="text"
                        required
                        placeholder="Qual nome do seu bolão?"
                    />
                    <button
                        className="bg-yellow-500 py-4 px-6 rounded font-bold text-gray-900 text-sm hover:bg-yellow-700"
                        type="submit"
                    >
                        CRIAR MEU BOLÃO
                    </button>
                </form>
                <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                    Após criar seu bolão, você receberá um código único que
                    poderá usar para convidar outras pessoas 🚀
                </p>
                <div className="mt-10 pt-10 flex border-t border-gray-600 justify-around items-center text-gray-100">
                    <div className="flex items-center gap-6">
                        <Image src={iconCheckImg} alt="Check icon" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">+2.034</span>
                            <span>Bolões criados</span>
                        </div>
                    </div>
                    <div className="w-px h-12 bg-gray-800"/>
                    <div className="flex items-center gap-6">
                        <Image src={iconCheckImg} alt="Check icon" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">+2.034</span>
                            <span>Palpites enviados</span>
                        </div>
                    </div>
                </div>
            </main>
            <Image
                src={appPreviewImg}
                alt="Two smartphones showing the application"
                quality={100}
            />
        </div>
    );
}

// export const getServerSideProps = async () => {
//   const response = await fetch('http://localhost:3333/pools/count')
//   const data = await response.json()
//   console.log(data)

//   return {
//     props: {
//       count: data.count,
//     }
//   }
// }
